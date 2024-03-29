import {Speaker} from "./speaker";

/***
 The fields provided from a character definition.
 These are always bots and not human.
 @question Why isn't this V2 Spec? Why aren't there optional/undefined values?
 @answer I have a strong quasi-religious opposition to the way js/ts handle optionality.
         I do not believe in undefined.
 ***/
export interface Character extends Speaker {

    /***
     @type string
     @default ""
     @description This is the main "description" field of the character card.
     ***/
    description: string;

    /***
     @type string
     @default ""
     @description This is full, unparsed block of example dialogs.
     ***/
    example_dialogs: string;

    /***
     @type string
     @default ""
     @description This is the main "personality" field of the character card.
     ***/
    personality: string;

    /***
     @type string
     @default ""
     @description This is the default first message of the character card.
     ***/
    first_message: string;

    /***
     @type string
     @default ""
     @description This is the main "scenario" field of the character card.
     ***/
    scenario: string;

    /***
     @type string
     @default ""
     @description This is the deprecated tavern "personality" field of the character card.
     ***/
    tavern_personality: string;

    /***
     @type string | null
     @default null
     @description This is the character-specific system prompt, if any.
     ***/
    system_prompt: string | null;

    /***
     @type string | null
     @default null
     @description This is the character-specific post-history-instructions/"jailbreak", if any.
     ***/
    post_history_instructions: string | null;

    /***
     @type string[]
     @default []
     @description Any alternate non-default greetings the character has, if any.
     ***/
    alternate_greetings: string[];

    /***
     @type Record<string, any>, AKA this could be absolutely anything but at least it's definitely a dict.
     @default {}
     @description A selection of *some* of the values of the character's extensions dict.
        Some values, like extensions.chub.full_path, extensions.chub.id, et cetera, are redacted so as not to send
        specific character identities to the extension code.
     @remark IFF this character has a configuration specific to THIS extension, it will be located in
        character.partial_extensions.chub.extension.config
     ***/
    partial_extensions: Record<string, any>;
}