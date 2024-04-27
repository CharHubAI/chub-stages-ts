import {Duration} from "./base";

/***
 A music generation request.
 ***/
export interface MusicGenerationRequest {

    /***
     @type string
     @default "Elevator music with dementia"
     @description The general tone.
     ***/
    prompt: string,

    /***
     @type string | null
     @default null
     @description Specific lyrics for the song, if desired.
     ***/
    lyrics: string | null,

    /***
     @type string[] | null
     @default null
     @description A list of broad genres, etc.
     ***/
    tags: string[] | null,

    /***
     @type string | null
     @default null
     @description The title of the song.
     ***/
    title: string | null,

    /***
     @type boolean
     @default false
     @description Whether this should be purely instrumental or not.
     ***/
    instrumental: boolean,

    /***
     @type string | null
     @default null
     @description If you would like lyrics generated, describe what lyrics you want.
     ***/
    lyrics_prompt: string | null

}

/***
 A voice narration request.
 ***/
export interface TextToSpeechRequest {

    /***
     @type string
     @default "The quick brown fox jumps over the lazy dog."
     @description The text to say.
     ***/
    transcript: string

    /***
     @type string | null
     @default null
     @description The Chub ID of the voice to use.
     ***/
    voice_id: string

}

/***
 A sound effect request.
 ***/
export interface FoleyRequest extends Duration {

    /***
     @type string
     @default Thunderstorm
     @description What sound you want to hear.
     ***/
    prompt: string

}
