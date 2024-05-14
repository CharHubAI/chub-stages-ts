/***
 The input type for both beforePrompt and afterResponse.
 ***/
export interface Message {
    /***
     @type string
     @default ""
     @description Either the last message about to be sent,
      or the bot's response. ***/
    content: string,

    /***
     @type string
     @default "0"
     @description An anonymized ID that is unique to this individual
      in this chat, but NOT their Chub ID. ***/
    anonymizedId: string,

    /***
     @type: boolean
     @description Whether this is itself from another bot, ex. in a group chat.
     ***/
    isBot: boolean,

    /***
     @type string
     @default "0"
     @description The anonymized ID of the bot or human being prompted, if any.
       Essentially only relevant to beforePrompt currently.
     ***/
    promptForId: string | null

    /***
     @type string
     @description The unique ID of this chat message.
     ***/
    identity: string

    /***
     @type boolean
     @default true
     @description Whether this is in the currently main/active chat.
        Unless you have specifically made a nudge request with main false,
        this will always be true.
     ***/
    isMain: boolean;

}
