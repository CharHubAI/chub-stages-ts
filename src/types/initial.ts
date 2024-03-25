import {Character} from "./character";
import {User} from "./user";


export interface InitialData<StateType, ConfigType> {
    characters: { [key: string]: Character },
    users: { [key: string]: User},
    config: ConfigType | null,
    lastState: StateType | null
}