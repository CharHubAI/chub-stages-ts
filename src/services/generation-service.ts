import {ImageRequest, ImagineResponse, ImageToImageRequest, AnimateImageRequest} from "../types/generation/images";
import {GENERATION_REQUESTS} from "../types/generation/constants";
import {sendMessageAndAwait} from "./messaging";

/***
 Requests a newly generated image from the API.
 ***/
function makeImage(textToImageRequest: ImageRequest): Promise<ImagineResponse | null> {
    return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.TEXT2IMAGE, textToImageRequest);
}

/***
 Requests an image generated based off of an original source image from the API.
 ***/
function imageToImage(imageToImageRequest: ImageToImageRequest): Promise<ImagineResponse | null> {
    return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.IMAGE2IMAGE, imageToImageRequest);
}

/***
 Requests an animation of an existing image.
 ***/
function animateImage(animateImageRequest: AnimateImageRequest): Promise<ImagineResponse | null> {
    return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.ANIMATE, animateImageRequest, 600);
}

/***
 Note: As of 04/26/2024, these are largely unimplemented.
 ***/
export const generationService = {
    makeImage,
    imageToImage,
    animateImage
};
