import { Extension, ExtensionResponse } from "./extension";
import { InitialData } from "./initial";
import { Message } from "./message";
import { ReactElement } from "react";
export declare class ChubExtension implements Extension<any, any> {
    constructor(data: InitialData<any, any>);
    load(): Promise<boolean>;
    setState(state: any): Promise<void>;
    beforePrompt(userMessage: Message): Promise<ExtensionResponse<any>>;
    afterResponse(botMessage: Message): Promise<ExtensionResponse<any>>;
    render(): ReactElement;
}
