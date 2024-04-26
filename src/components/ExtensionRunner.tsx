import {ReactRunner, ReactRunnerProps} from "./ReactRunner";
import {Extension} from "../types/extension";

/***
 @deprecated Please rename to 'ReactRunnerProps'.
 ***/
export interface ExtensionRunnerProps<ExtensionType extends Extension<InitStateType, ChatStateType, MessageStateType, ConfigType>, InitStateType, ChatStateType, MessageStateType, ConfigType> extends ReactRunnerProps<any, any, any, any, any> {
}

/***
 @deprecated Please rename to 'ReactRunner'.
 ***/
export const ExtensionRunner = ReactRunner;
