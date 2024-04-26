import {InitialState} from "./stateful";

/***
 The response type for initial loading.
 ***/
export interface LoadResponse<InitStateType, ChatStateType, MessageStateType> extends InitialState<InitStateType, ChatStateType, MessageStateType> {

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

}
