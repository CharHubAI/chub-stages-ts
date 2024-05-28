/***
 The runner code for a stage inside an iFrame.
 If you're writing a stage, reading this won't be useful.
 If you aren't, why are you here?
 @link https://lfs.charhub.io/important_message
 ***/
import React, {useEffect, useState} from "react";

import {InitialData} from "../types/initial";
import {StageBase} from "../types/stage";
import {DEFAULT_INITIAL, DEFAULT_LOAD_RESPONSE, DEFAULT_RESPONSE} from "../types/defaults";
import {Loading} from "./Loading";
import {ALLOWED_ORIGINS} from "../services/messaging";

export interface ReactRunnerProps<StageType extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType>, InitStateType, ChatStateType, MessageStateType, ConfigType> {
    factory: (data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>) => StageType;
    debug?: boolean; // Optional and defaults to false
}

const INIT = 'INIT';
const BEFORE = 'BEFORE';
const AFTER = 'AFTER';
const SET = 'SET';
const CALL = 'CALL';

const MESSAGE_TYPES: Set<string> = new Set<string>([INIT, BEFORE, AFTER, SET]);

export const ReactRunner = <StageType extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType>,
    InitStateType, ChatStateType, MessageStateType, ConfigType>({factory, debug = false}: ReactRunnerProps<StageType, InitStateType, ChatStateType, MessageStateType, ConfigType>) => {

    const [stage, setStage] = useState(null as null | StageBase<any, any, any, any>);
    const [node, setNode] = useState(new Date());
    const [previous, setPrevious] = useState({key: '', value: {}})

    function sendMessage(messageType: string, message: any) {
        window.parent.postMessage({"messageType": messageType, "data": message}, '*');
    }

    useEffect(() => {
        const handleMessage = async (event) => {
            try {
                if (!ALLOWED_ORIGINS.has(event.origin)) {
                    console.warn('Received message from unauthorized origin: ', event.origin);
                    return;
                }

                if (event.source !== window.parent) {
                    console.warn('Received message from unauthorized source: ', event.source);
                    return;
                }

                const {messageType, data} = event.data;
                if (debug && MESSAGE_TYPES.has(messageType)) {
                    console.debug('Stages iFrame received event from origin: ', event.origin);
                    console.debug('Stages iFrame received data: ', event.data);
                }
                const answerKey = messageType + ': ' + JSON.stringify(data);
                if (previous.key == answerKey) {
                    if(debug) {
                        console.debug('Already seen, returning previous');
                    }
                    sendMessage(messageType, previous.value);
                } else if (messageType == 'INIT') {
                    if (stage != null) {
                        console.warn("INIT message for non-null stage.");
                        sendMessage('INIT', {
                            ...DEFAULT_LOAD_RESPONSE
                        });
                        setPrevious({...previous, key: answerKey});
                    } else {
                        let newStage = factory({...DEFAULT_INITIAL, ...data});
                        const canContinue = await newStage.load();
                        const response = {
                            ...DEFAULT_LOAD_RESPONSE, ...canContinue
                        };
                        setPrevious({key: answerKey, value: response});
                        sendMessage('INIT', response);
                        setStage(newStage);
                    }
                } else if (stage == null) {
                    console.warn('Null stage instance for non-INIT message.');
                } else if (messageType == 'BEFORE') {
                    const beforeResponse = await stage?.beforePrompt({...data});
                    const response = {
                        ...DEFAULT_RESPONSE,
                        ...beforeResponse
                    };
                    setPrevious({key: answerKey, value: response});
                    sendMessage('BEFORE', response);
                } else if (messageType == 'AFTER') {
                    const afterResponse = await stage?.afterResponse({...data});
                    const response = {
                        ...DEFAULT_RESPONSE,
                        ...afterResponse
                    };
                    setPrevious({key: answerKey, value: response});
                    sendMessage('AFTER', response);
                } else if (messageType == 'SET') {
                    await stage?.setState(data);
                    setPrevious({key: answerKey, value: {}});
                    sendMessage('SET', {});
                } else if (messageType == CALL) {
                    const {functionName, parameters} = data;
                    if (stage.hasOwnProperty(functionName)) {
                        const result = (stage[functionName] as (parameters: any) => any)(parameters);
                        sendMessage(CALL, {
                            functionName,
                            result
                        });
                    } else {
                        console.error(`Function '${functionName}' does not exist on the stage.`);
                        sendMessage(CALL, {
                            functionName,
                            result: null
                        });
                    }
                }
            } catch (exception: any) {
                console.error('Stages iFrame had an unexpected error: ', exception);
                window.parent.postMessage({
                    "messageType": 'ERROR', "data": {
                        name: exception.name,
                        message: exception.message,
                        stack: exception.stack
                    }
                });
            } finally {
                setNode(new Date());
            }

        };
        window.removeEventListener('message', handleMessage);
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [stage]);

    return <>
        <div style={{display: 'none'}}>{String(node)}{window.location.href}</div>
        {stage == null ? <Loading/> : stage.render()}
    </>;
}

