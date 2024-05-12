import {GenerationRequest, PromptedRequest} from "./base";

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
export interface ImageRequest extends GenerationRequest, PromptedRequest {

    /***
     @type string enum | null
     @default: 1:1
     @description The aspect ratio of the image to make.
     ***/
    aspect_ratio: AspectRatio | null

    /***
     @type boolean | null
     @default false
     @description Whether to strip the background before returning.
     ***/
    remove_background: boolean | null

}

/***
 An image-to-image generation request.
 ***/
export interface ImageToImageRequest extends ImageRequest {

    /***
     @type string
     @required true
     @default CHUBBY_KITTY
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
 An inpainting request.
 ***/
export interface InpaintRequest extends ImageToImageRequest {

    /***
     @type string | null
     @default null
     @description A base64 dataurl or url of the image mask. If not provided,
       you must provide a search_prompt. If provided with a search_prompt, it
       overrides it.
     ***/
    mask: string | null

    /***
     @type string | null
     @default "Anything with a face"
     @description A short description of what entity in the image you wish to replace.
       Results may vary. If a mask is provided, this field is ignored.
     ***/
    search_prompt: string | null

}

/***
 A background removal request.
 ***/
export interface RemoveBackgroundRequest {
    /***
     @type string
     @required true
     @default CHUBBY_KITTY
     @description The base64 of or a URL of an image.
     ***/
    image: string,
}

/***
 An image-to-video animation request.
 ***/
export interface AnimateImageRequest extends GenerationRequest {

    /***
     @type string
     @required true
     @default CHUBBY_KITTY
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
     @description Lower values generally result in less motion in the output video, while higher values generally result in more motion.
     ***/
    motion_bucket_id: number

}
