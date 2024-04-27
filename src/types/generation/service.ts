import {
    AnimateImageRequest,
    ImageRequest,
    ImageToImageRequest,
    ImagineResponse,
    InpaintRequest,
    RemoveBackgroundRequest
} from "./images";
import {TextToVideoRequest} from "./videos";
import {FoleyRequest, MusicGenerationRequest, TextToSpeechRequest} from "./audio";

export interface GenerationService {

    /***
     Requests a newly generated image from the API based off a text prompt.
     ***/
    makeImage(textToImageRequest: Partial<ImageRequest>): Promise<ImagineResponse | null>

    /***
     Requests an image generated based off of an original source image from the API.
     ***/
    imageToImage(imageToImageRequest: Partial<ImageToImageRequest>): Promise<ImagineResponse | null>

    /***
     Requests an animation of an existing image.
     ***/
    animateImage(animateImageRequest: Partial<AnimateImageRequest>): Promise<ImagineResponse | null>

    /***
     Requests that an image be inpainted with something else.
     ***/
    inpaintImage(inpaintRequest: Partial<InpaintRequest>): Promise<ImagineResponse | null>

    /***
     Removes the background of the image.
     ***/
    removeBackground(removeRequest: Partial<RemoveBackgroundRequest>): Promise<ImagineResponse | null>

    /***
     Requests a newly generated video from the API based off a text prompt.
     ***/
    makeVideo(textToVideoRequest: Partial<TextToVideoRequest>): Promise<ImagineResponse | null>

    /***
     Requests a sound effect.
     ***/
    makeSound(foleyRequest: Partial<FoleyRequest>): Promise<ImagineResponse | null>

    /***
     Requests text-to-speech with a voice.
     ***/
    speak(textToSpeechRequest: Partial<TextToSpeechRequest>): Promise<ImagineResponse | null>

    /***
     Requests a song.
     ***/
    makeMusic(textToMusicRequest: Partial<MusicGenerationRequest>): Promise<ImagineResponse | null>

}
