
export interface ImpersonateRequest {

    /***
     @default ''
     @description The full message text.
     ***/
    message: string

    /***
     @description The ID of the player or bot to impersonate.
     ***/
    speaker_id: string

}

export interface EnvironmentRequest {

    /***
     @default ''
     @description An image URL. If included, updates the chat's background image.
    ***/
    background: string | null

}