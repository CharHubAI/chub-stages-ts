
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

    /***
     @default 50
     @description Stops the LLM from rambling. Useful to keep this low
       for queries like 'which action should we take?'
     ***/
    max_tokens: number

    /***
     @default false
     @description Whether the chat history should be included in the request.
     ***/
    include_history: boolean

}
