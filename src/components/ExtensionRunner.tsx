import {ReactRunner, ReactRunnerProps} from "./ReactRunner";
import {StageBase} from "../types/stage";

/***
 @deprecated Please rename to 'ReactRunnerProps'.
 ***/
export interface ExtensionRunnerProps<StageType extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType>, InitStateType, ChatStateType, MessageStateType, ConfigType> extends ReactRunnerProps<any, any, any, any, any> {
}

/***
 @deprecated Please rename to 'ReactRunner'.
 ***/
export const ExtensionRunner = ReactRunner;
