export enum AspectRatio {
    SQUARE = '1:1',
    WIDESCREEN_HORIZONTAL = '16:9',
    CINEMATIC_HORIZONTAL = '21:9',
    PHOTO_VERTICAL = '2:3',
    PHOTO_HORIZONTAL = '3:2',
    POST_VERTICAL = '4:5',
    POST_HORIZONTAL = '5:4',
    WIDESCREEN_VERTICAL = '9:16',
    CINEMATIC_VERTICAL = '9:21'
}

export interface ImageResponse {
    url: string,
    seed: string
}

export interface ImageRequest {
    prompt: string,

    /***
     string
     Default: 1:1
     ***/
    aspect_ratio: AspectRatio,

    negative_prompt: string | null,

    seed: number | null
}

export interface ImageToImageRequest extends ImageRequest {

    image: string,

    strength: number

}
