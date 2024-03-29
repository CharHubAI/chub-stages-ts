import React, {useState} from "react";

import {InitialData} from "../types/initial";
import {Extension, ExtensionResponse} from "../types/extension";

export interface ExtensionRunnerProps<ExtensionType extends Extension<StateType, ConfigType>, StateType, ConfigType> {
    factory: (data: InitialData<StateType, ConfigType>) => ExtensionType;
}

const DEFAULT_RESPONSE: ExtensionResponse<any> = {
    error: null, extensionMessage: null, modifiedMessage: null, state: null
}

const DEFAULT_INITIAL: InitialData<any, any> = {
    characters: {}, config: null, lastState: null, users: {}
}

export const ExtensionRunner = <ExtensionType extends Extension<StateType, ConfigType>,
    StateType, ConfigType>({ factory }: ExtensionRunnerProps<ExtensionType, StateType, ConfigType>) => {

    const [extension, setExtension] = useState(null as null | Extension<any, any>);
    const [node, setNode] = useState(new Date());

    function sendMessage(messageType: string, message: any) {
        window.parent.postMessage({"messageType": messageType, "data": message}, '*');
    }

    window.addEventListener('message', async (event) => {
        console.debug('Extensions iFrame received event from origin: ', event.origin);
        console.debug('Extensions iFrame received data: ', event.data);
        const {messageType, data} = event.data;
        try {
            if(messageType == 'INIT') {
                let newExtension = factory({...DEFAULT_INITIAL, ...data});
                const canContinue = await newExtension.load();
                sendMessage( 'INIT',  {
                    "success": canContinue
                });
                setExtension(newExtension);
                setNode(new Date());
            } else if (messageType == 'BEFORE') {
                sendMessage('BEFORE', {...DEFAULT_RESPONSE,
                    ...await extension?.beforePrompt({...data})});
                setNode(new Date());
            } else if (messageType == 'AFTER') {
                sendMessage('AFTER', {...DEFAULT_RESPONSE,
                    ...await extension?.afterResponse({...data})});
                setNode(new Date());
            } else if (messageType == 'SET') {
                await extension?.setState(data);
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
            {extension == null ? <div>Extension loading...</div> : extension.render()}
    </>;
}

