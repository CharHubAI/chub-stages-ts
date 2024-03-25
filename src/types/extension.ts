import {ReactElement} from "react";
import {InitialData} from "./initial";
import {Message} from "./message";

export interface ExtensionResponse<StateType> {
    state: StateType | null,
    modifiedMessage: string | null
}

export abstract class Extension<StateType, ConfigType> {

    protected constructor(data: InitialData<StateType, ConfigType>) { }

    abstract load(): Promise<boolean>;

    abstract setState(state: StateType): Promise<void>;

    abstract beforePrompt(inputMessage: Message): Promise<ExtensionResponse<StateType>>;

    abstract afterResponse(botMessage: Message): Promise<ExtensionResponse<StateType>>;

    abstract render(): ReactElement;

}
