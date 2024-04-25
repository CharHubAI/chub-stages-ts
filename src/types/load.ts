/***
 The response type for initial loading.
 ***/
export interface LoadResponse {

    /***
     @type string | null
     @default null
     @description an error message to show
      briefly at the top of the screen, if any. ***/
    error: string | null,

    /***
     @type: boolean
     @default true
     @description Whether this is itself from another bot, ex. in a group chat.
     ***/
    success: boolean,


    /***
     @type null | Dict[str, Any]
     @default null
     @description If there is any state unique to a chat, like procedurally generated
       terrain that is only created ONCE and only once per chat, return it here to be saved.
     ***/
    initState: null | {[key: string]: any}

}
