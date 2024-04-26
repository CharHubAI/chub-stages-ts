import {GenerationRequest} from "./base";

/***
 All accepted Aspect Ratios.
 ***/
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

/***
 The common image generation/modification response.
 ***/
export interface ImagineResponse {
    /***
     @type string
     @default ''
     @description The URL of the image or video.
     ***/
    url: string,

    /***
     @type number | null
     @default null
     @description The seed used in the image generation, if any.
     ***/
    seed: number | null
}

/***
 A text-to-image generation request.
 ***/
export interface ImageRequest extends GenerationRequest {
    /***
     @type string
     @default ''
     @description The prompt to send to the generator.
     ***/
    prompt: string,

    /***
     @type string enum
     @default: 1:1
     @description The aspect ratio of the image to make.
     ***/
    aspect_ratio: AspectRatio,

    /***
     @type string | null
     @default null
     @description The negative prompt, if any.
     ***/
    negative_prompt: string | null,

}

/***
 An image-to-image generation request.
 ***/
export interface ImageToImageRequest extends ImageRequest {

    /***
     @type string
     @required true
     @description The base64 of or a URL of an image.
     ***/
    image: string,

    /***
     @type number
     @default 0.7
     @description The strength of the modification. 0 = will return the original image,
       1 = will be a completely new image.
     ***/
    strength: number

}

/***
 An image-to-video animation request.
 ***/
export interface AnimateImageRequest extends GenerationRequest {

    /***
     @type string
     @required true
     @description The base64 of or a URL of an image.
     ***/
    image: string,

    /***
     @type number
     @default 1.8
     @range [0, 10]
     @description How strongly the video sticks to the original image. Use lower values to allow the model more freedom to make changes and higher values to correct motion distortions.
     ***/
    cfg_scale: number,

    /***
     @type number
     @default 127
     @range [1, 255]
     @description Lower values generally result in less motion in the output video, while higher values generally result in more motion. This parameter corresponds to the motion_bucket_id parameter from the paper.
     ***/
    motion_bucket_id: number

}
