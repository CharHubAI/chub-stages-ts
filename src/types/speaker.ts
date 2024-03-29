/***
 Fields that both Characters and Users have.
 ***/
export interface Speaker {
    /***
     @type string
     @default "0"
     @description An anonymized ID that is unique to this individual
      in this chat, but NOT their Chub ID.
     ***/
    anonymizedId: string

    /***
     @type string
     @description The in-chat name of the Character or User.
     ***/
    name: string

    /***
     @type boolean
     @default false
     @description If true, this person or bot is no longer in the chat,
        but used to be.
     ***/
    isRemoved: boolean
}
