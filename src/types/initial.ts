import {Character} from "./character";
import {User} from "./user";
import {InitialState} from "./stateful";


/***
 The data structure sent to the Component on instantiation.
 ***/
export interface InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType> extends InitialState<InitStateType, ChatStateType, MessageStateType> {

    /***
     @type { [key: string]: Character }, AKA a mapping of anonymized IDs to Characters.
     @default {}
     @description All of the characters that are *or have ever been in* this chat.
     ***/
    characters: { [key: string]: Character },

    /***
     @type { [key: string]: User }, AKA a mapping of anonymized IDs to Users.
     @default {}
     @description All of the users that are *or have ever been in* this chat.
     ***/
    users: { [key: string]: User},

    /***
     @type ConfigType | null
     @default null
     @description The component-specific configuration, if any.
     ***/
    config: ConfigType | null,

}
