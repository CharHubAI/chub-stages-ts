export enum AspectRatio {
    1_1 = '1:1',
    16_9 = '16:9',
    21_9 = '21:9',
    2_3 = '2:3',
    3_2 = '3:2',
    4_5 = '4:5',
    5_4 = '5:4',
    9_16 = '9:16',
    9_21 = '9:21'
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
