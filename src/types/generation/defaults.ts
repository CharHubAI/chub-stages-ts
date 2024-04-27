import {
    AnimateImageRequest,
    AspectRatio,
    ImageRequest,
    ImageToImageRequest,
    InpaintRequest,
    RemoveBackgroundRequest
} from "./images";
import {CHUBBY_KITTY} from "./constants";
import {Duration, GenerationRequest, PromptedRequest} from "./base";
import {TextToVideoRequest} from "./videos";
import {FoleyRequest, MusicGenerationRequest, TextToSpeechRequest} from "./audio";

export const DEFAULT_GENERATION_REQUEST: GenerationRequest = {
    seed: null
}

export const DEFAULT_PROMPTED_REQUEST: PromptedRequest = {
    negative_prompt: null,
    prompt: "Super cute chubby kitten, high res perfect, will make you believe in the afterlife, 8K",
}

export const DEFAULT_IMAGE_REQUEST: ImageRequest = {
    aspect_ratio: AspectRatio.SQUARE,
    ...DEFAULT_PROMPTED_REQUEST,
    ...DEFAULT_GENERATION_REQUEST
};

export const DEFAULT_IMAGE_TO_IMAGE_REQUEST: ImageToImageRequest = {
    ...DEFAULT_IMAGE_REQUEST, image: CHUBBY_KITTY, strength: 0.7
}

export const DEFAULT_ANIMATION_REQUEST: AnimateImageRequest = {
    ...DEFAULT_GENERATION_REQUEST, image: CHUBBY_KITTY, cfg_scale: 1.8,
    motion_bucket_id: 127
}

export const DEFAULT_INPAINT_REQUEST: InpaintRequest = {
    ...DEFAULT_IMAGE_TO_IMAGE_REQUEST,
    search_prompt: "Anything with a face", mask: null
}

export const DEFAULT_BACKGROUND_REMOVAL_REQUEST: RemoveBackgroundRequest = {
    image: CHUBBY_KITTY
}

export const DEFAULT_DURATION: Duration = {
    seconds: 5,
}

export const DEFAULT_TEXT_TO_VIDEO_REQUEST: TextToVideoRequest = {
    ...DEFAULT_PROMPTED_REQUEST,
    ...DEFAULT_DURATION
}

export const DEFAULT_FOLEY_REQUEST: FoleyRequest = {
    ...DEFAULT_DURATION,
    prompt: 'Thunderstorm'
}

export const DEFAULT_TTS_REQUEST: TextToSpeechRequest = {
    transcript: "The quick brown fox jumps over the lazy dog.", voice_id: null
}

export const DEFAULT_MUSIC_REQUEST: MusicGenerationRequest = {
    prompt: "Elevator music with dementia",
    lyrics: null, tags: null, title: null, instrumental: false,
    lyrics_prompt: null
}
