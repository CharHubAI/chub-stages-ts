import {StageBase, StageResponse} from "./stage";

/***
 @deprecated Please use the renamed interface 'StageResponse'.
 ***/
export interface ExtensionResponse<ChatStateType, MessageStateType> extends StageResponse<ChatStateType, MessageStateType> {}

/***
 @deprecated Please use the renamed class 'StageBase'.
 ***/
export abstract class Extension<InitStateType, ChatStateType, MessageStateType, ConfigType> extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType> {}
