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
    isBot: boolean
}
