

export interface MessagingResponse {

    /***
     @type boolean
     @default true
     @description Whether the operation succeeded.
     ***/
    success: boolean

    /***
     @type string | null
     @default null
     @description An error message, if any.
     ***/
    error: string | null

}