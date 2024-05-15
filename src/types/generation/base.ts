
export interface GenerationRequest {

    /***
     @type number | null
     @default null
     @description The seed to be used in the generation, if any.
     ***/
    seed: number | null

    /***
     @type string | null
     @default null
     @description If you would like to save this across runs/conversations with an individual,
        give it some semi-unique (needs to be unique for a given stage + user combo) name.
     ***/
    item_id: string

}

export interface PromptedRequest {

    /***
     @type string
     @default "Super cute chubby kitten, high res perfect, will make you believe in the afterlife, 8K"
     @description The prompt to send to the generator.
     ***/
    prompt: string,

    /***
     @type string | null
     @default null
     @description The negative prompt, if any.
     ***/
    negative_prompt: string | null,

}

export interface Duration {

    /***
     @type number
     @default 5
     @range [1, 30]
     @description How many seconds long you want the video to be.
     ***/
    seconds: number

}
