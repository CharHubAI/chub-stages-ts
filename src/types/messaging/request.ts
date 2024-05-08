
export interface SpeechRequest {

    /***
     @default '1'
     @description The ID of the player or bot being nudged/impersonated.
     ***/
    speaker_id: string

    /***
     @default null
     @type number
     @description If you'd like to specify a specific message that is the
        parent of this new message in the chat tree, do so here. If the
        value given is null or any value not in the chat, the parent id
        will be the current active leaf node, i.e. the new message will be
        added to the end of the chat.
     IFF the parent id given is the special value "-2", chosen because
        people sometime use 0 or -1 as "no/nvm" values but only a
        psychopath uses -2 for that, then the new message will be added
        at the root level of the chat, i.e. as if it were a new greeting.
     ***/
    parent_id: string | null

    /***
     @type boolean
     @default true
     @description Whether the new message should be marked as part of the
        current 'main' thread of the chat tree. Unless you're doing something
        odd with multiple chat threads that the player isn't involved in,
        you generally want to leave this as true.
     ***/
    is_main: boolean

}


export interface NudgeRequest extends SpeechRequest {

    /***
     @type string | null
     @default null
     @description A string, if any, to add to the end of the
      final prompt sent to the LLM, but that isn't persisted or visible to the user. ***/
    stage_directions: string | null

    /***
     @type string[] | null
     @default null
     @description If you only want a subset of all players and characters in
        the chat involved in this conversation, list which characters whose
        definitions should be included here. Otherwise, all will be included
        as usual.
     ***/
    participants: string[] | null

}

export interface ImpersonateRequest extends SpeechRequest {

    /***
     @default ''
     @description The full message text.
     ***/
    message: string

}

export interface EnvironmentRequest {

    /***
     @default null
     @description An image URL. If included, updates the chat's background image.
    ***/
    background: string | null

    /***
     @default true
     @description Whether the player is allowed to send new messages.
       If your stage is full screen, this is irrelevant. This can be useful if
       you have some internal tick system and tasks that need to finish before
       new inputs make sense, e.g. having sprites moving on a world map.
     ***/
    input_enabled: boolean | null

}