
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

    /***
     @link https://docs.chub.ai/docs/stages/developing-a-stage/generators-and-messaging/prompt-templating
     @description Override how the full prompt will be formatted, IFF history is included. See the link for all options.
     ***/
    template: string

    /***
     @default null
     @description Override the max context length to a lower value, if desired.
     ***/
    context_length: number | null

    /***
     @default null
     @description Override the minimum tokens returned to a lower value, if desired.
     ***/
    min_tokens: number | null

}
