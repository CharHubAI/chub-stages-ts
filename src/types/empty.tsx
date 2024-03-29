import {Extension, ExtensionResponse} from "./extension";
import {InitialData} from "./initial";
import {Message} from "./message";
import React from "react";
import {ReactElement} from "react";

export class ChubExtension implements Extension<any, any> {

    constructor(data: InitialData<any, any>) {}

    async load(): Promise<boolean> {
        return true;
    }

    async setState(state: any): Promise<void> { }

    async beforePrompt(userMessage: Message): Promise<Partial<ExtensionResponse<any>>> {
        return {extensionMessage: null, state: null, modifiedMessage: null, error: null};
    }

    async afterResponse(botMessage: Message): Promise<Partial<ExtensionResponse<any>>> {
        return {extensionMessage: null, state: null, modifiedMessage: null, error: null};
    }

    render(): ReactElement {
        return <div>Hello World! I'm an empty extension!</div>;
    }

}