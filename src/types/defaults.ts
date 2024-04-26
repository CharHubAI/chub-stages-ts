import {InitialData} from "./initial";
import {Character} from "./character";
import {User} from "./user";
import {Message} from "./message";
import {LoadResponse} from "./load";
import {ExtensionResponse} from "./extension";

export const DEFAULT_INITIAL: InitialData<any, any, any, any> = {
    initState: null,
    characters: {}, config: null, messageState: null, users: {}, chatState: null
}

export const DEFAULT_CHARACTER: Character = {
    alternate_greetings: [],
    anonymizedId: "1",
    description: "",
    example_dialogs: "",
    first_message: "",
    isRemoved: false,
    name: "",
    partial_extensions: {},
    personality: "",
    post_history_instructions: "",
    scenario: "",
    system_prompt: "",
    tavern_personality: ""
}

export const DEFAULT_USER: User = {
    anonymizedId: "0", chatProfile: "", isRemoved: false, name: ""
}

export const DEFAULT_MESSAGE: Message = {
    anonymizedId: "0", content: "", isBot: false, promptForId: "1"
}

export const DEFAULT_LOAD_RESPONSE: LoadResponse<any, any, any> = {
    error: null, success: true, chatState: null, initState: null, messageState: null
}

export const DEFAULT_RESPONSE: ExtensionResponse<any, any> = {
    chatState: null, systemMessage: null,
    error: null, extensionMessage: null, modifiedMessage: null,
    messageState: null
}
