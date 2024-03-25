import {Speaker} from "./speaker";

export interface Character extends Speaker {
    description: string;
    example_dialogs: string;
    personality: string;
    first_message: string;
    scenario: string;
    tavern_personality: string;
    system_prompt: string | null;
    post_history_instructions: string | null;
    alternate_greetings: string[];
    partial_extensions: Record<string, any>;
}