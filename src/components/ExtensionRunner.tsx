/***
 The runner code for an extension inside an iFrame.
 If you're writing an extension, reading this won't be useful.
 If you aren't, why are you here?
 @link https://lfs.charhub.io/important_message
 ***/
import React, {useState} from "react";

import {InitialData} from "../types/initial";
import {Extension} from "../types/extension";
import {DEFAULT_INITIAL, DEFAULT_LOAD_RESPONSE, DEFAULT_RESPONSE} from "../types/defaults";
import {Loading} from "./Loading";

export interface ExtensionRunnerProps<ExtensionType extends Extension<StateType, ConfigType>, StateType, ConfigType> {
    factory: (data: InitialData<StateType, ConfigType>) => ExtensionType;
}

const INIT = 'INIT';
const BEFORE = 'BEFORE';
const AFTER = 'AFTER';
const SET = 'SET';

const MESSAGE_TYPES: Set<string> = new Set<string>([INIT, BEFORE, AFTER, SET]);

export const ExtensionRunner = <ExtensionType extends Extension<StateType, ConfigType>,
    StateType, ConfigType>({ factory }: ExtensionRunnerProps<ExtensionType, StateType, ConfigType>) => {

    const [extension, setExtension] = useState(null as null | Extension<any, any>);
    const [node, setNode] = useState(new Date());

    function sendMessage(messageType: string, message: any) {
        window.parent.postMessage({"messageType": messageType, "data": message}, '*');
    }

    window.addEventListener('message', async (event) => {
        try {
            const {messageType, data} = event.data;
            if(MESSAGE_TYPES.has(messageType)) {
                console.debug('Extensions iFrame received event from origin: ', event.origin);
                console.debug('Extensions iFrame received data: ', event.data);
            }
            if(messageType == 'INIT') {
                if (extension != null) {
                    console.warn("INIT message for non-null extension.");
                    sendMessage('INIT', {
                        ...DEFAULT_LOAD_RESPONSE
                    });
                } else {
                    let newExtension = factory({...DEFAULT_INITIAL, ...data});
                    const canContinue = await newExtension.load();
                    sendMessage( 'INIT',  {
                        ...DEFAULT_LOAD_RESPONSE, ...canContinue
                    });
                    setExtension(newExtension);
                }
            } else if(extension == null) {
                console.warn('Null extension instance for non-INIT message.');
            } else if (messageType == 'BEFORE') {
                const beforeResponse = await extension?.beforePrompt({...data})
                sendMessage('BEFORE', {...DEFAULT_RESPONSE,
                    ...beforeResponse});
            } else if (messageType == 'AFTER') {
                const afterResponse = await extension?.afterResponse({...data});
                sendMessage('AFTER', {...DEFAULT_RESPONSE,
                    ...afterResponse});
            } else if (messageType == 'SET') {
                await extension?.setState(data);
                sendMessage('SET', {});
            }
        } catch (exception: any) {
            console.error('Extensions iFrame had an unexpected error: ', exception);
            window.parent.postMessage({"messageType": 'ERROR', "data": {
                    name: exception.name,
                    message: exception.message,
                    stack: exception.stack
                }});
        } finally {
            setNode(new Date());
        }

    });
    return <>
            <div style={{display: 'none'}}>{String(node)}{window.location.href}</div>
            {extension == null ? <Loading /> : extension.render()}
    </>;
}

