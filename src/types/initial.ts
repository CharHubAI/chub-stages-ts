import {Character} from "./character";
import {User} from "./user";


/***
 The data structure sent to the Extension on instantiation.
 ***/
export interface InitialData<StateType, ConfigType> {

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
     @description The extension-specific configuration, if any.
     ***/
    config: ConfigType | null,

    /***
     @type StateType | null
     @default null
     @description The extension-specific last state, if any. For a new chat, or when added to an existing chat,
        this will be null.
     ***/
    lastState: StateType | null

    /***
     @type null | Dict[str, Any]
     @default null
     @description If there is any state unique to a chat, like procedurally generated
      terrain that is only created ONCE and only once per chat, that you returned from
      a previous load(), it will be passed in here. If your load() returns a non-null
      value for initState and this is null, then this is the first instantiation of your
      extension for this chat. If not, then the chat has been started before.
     ***/
    initState: null | {[key: string]: any}
}
