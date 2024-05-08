
/***
 @default 'ADJACENT'
 @description If not set, falls back to 'ADJACENT'. Where your Stage exists onscreen.
    NONE is running but hidden, ADJACENT is above or to the side of a chat,
    COVER takes the entire screen except for the input box footer and navigation header,
    and FULLSCREEN takes everything except for the navigation header.
 ***/
export type StagePosition = 'NONE' | 'ADJACENT' | 'COVER' | 'FULLSCREEN' | null | undefined;
