import {Character} from "./character";
import {User} from "./user";
import {InitialState} from "./stateful";

/***
 The environment the stage is running in.
 ***/
export enum EnvironmentEnum {
    /***
     @description The environment in the TestRunner and by default.
     ***/
    development = 'development',

    /***
     @description The staging environment, when a project is being live edited within the UI.
     ***/
    staging = 'staging',

    /***
     @description Production, when a built and uploaded project is running normally.
     ***/
    production = 'production',

    /***
     @description Included for usage in custom testing if desired, but not given unless you explicitly set it.
     ***/
    testing = 'testing'
}

type Environment = {
    [key in keyof typeof EnvironmentEnum]: string;
}[keyof typeof EnvironmentEnum];

/***
 The data structure sent to the Stage on instantiation.
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
     @type null | ConfigType
     @default null
     @description The stage-specific configuration, if any.
     ***/
    config: ConfigType | null,

    /***
     @type Environment
     @default development
     @description What environment this is being run in.
     ***/
    environment: Environment

}
