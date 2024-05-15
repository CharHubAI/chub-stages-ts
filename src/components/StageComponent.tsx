import {Component} from "react";
import {InitialData} from "../types/initial";
import {StageBase} from "../types/stage";

export abstract class StageComponent<InitStateType, ChatStateType, MessageStateType, ConfigType> extends
    StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType>,
    Component<InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>, any>  {
    
}
