import {Speaker} from "./speaker";

/***
 User-specific fields that characters don't have.
 ***/
export interface User extends Speaker {
    /***
     @type string
     @default ""
     @description The user's persona description, if any.
     ***/
    chatProfile: string
}
