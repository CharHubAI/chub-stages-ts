
export interface TextResponse {

    /***
     @default ''
     @description The response string.
     ***/
    result: string

}

export interface TextGenRequest {

    /***
     @default ''
     @description The input string to send to the LLM.
     ***/
    prompt: string

    /***
     @default []
     @description What strings to stop generation on, if any.
     ***/
    stop: string[]

}
