import {InitialData} from "./initial";
import {Character} from "./character";
import {User} from "./user";
import {Message} from "./message";
import {LoadResponse} from "./load";
import {ExtensionResponse} from "./extension";

export const DEFAULT_INITIAL: InitialData<any, any> = {
    characters: {}, config: null, lastState: null, users: {}, initState: null
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

export const DEFAULT_LOAD_RESPONSE: LoadResponse = {
    error: null, success: true, initState: null
}

export const DEFAULT_RESPONSE: ExtensionResponse<any> = {
    error: null, extensionMessage: null, modifiedMessage: null, state: null
}
