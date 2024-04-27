import {
    AnimateImageRequest,
    ImageRequest,
    ImageToImageRequest,
    ImagineResponse,
    InpaintRequest, RemoveBackgroundRequest
} from "../types/generation/images";
import {CHUBBY_KITTY, GENERATION_REQUESTS} from "../types/generation/constants";
import {sendMessageAndAwait} from "./messaging";
import {GenerationService} from "../types/generation/service";
import {FFmpeg} from "@ffmpeg/ffmpeg";
import {
    DEFAULT_ANIMATION_REQUEST, DEFAULT_BACKGROUND_REMOVAL_REQUEST,
    DEFAULT_IMAGE_TO_IMAGE_REQUEST, DEFAULT_INPAINT_REQUEST
} from "../types/generation/defaults";
import {TextToVideoRequest} from "../types/generation/videos";
import {FoleyRequest, MusicGenerationRequest, TextToSpeechRequest} from "../types/generation/audio";

/***
 Note: As of 04/26/2024, these are largely unimplemented.
 ***/
export class LiveGenerator implements GenerationService {
    /***
     Requests a newly generated image from the API.
     ***/
    makeImage(textToImageRequest: Partial<ImageRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.TEXT2IMAGE, textToImageRequest);
    }

    /***
     Requests an image generated based off of an original source image from the API.
     ***/
    imageToImage(imageToImageRequest: Partial<ImageToImageRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.IMAGE2IMAGE, imageToImageRequest);
    }

    /***
     Requests an animation of an existing image.
     ***/
    animateImage(animateImageRequest: Partial<AnimateImageRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.ANIMATE, animateImageRequest, 600);
    }

    inpaintImage(inpaintRequest: Partial<InpaintRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.INPAINT, inpaintRequest);
    }

    removeBackground(removeRequest: Partial<RemoveBackgroundRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.REMOVE_BG, removeRequest);
    }

    makeVideo(textToVideoRequest: Partial<TextToVideoRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.TEXT2VIDEO, textToVideoRequest);
    }

    makeMusic(textToMusicRequest: Partial<MusicGenerationRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.TEXT2MUSIC, textToMusicRequest);
    }

    makeSound(foleyRequest: Partial<FoleyRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.FOLEY, foleyRequest);
    }

    speak(textToSpeechRequest: Partial<TextToSpeechRequest>): Promise<ImagineResponse | null> {
        return sendMessageAndAwait<ImagineResponse>(GENERATION_REQUESTS.TEXT2SPEECH, textToSpeechRequest);
    }

}

export class MockGenerator implements GenerationService {
    makeImage(textToImageRequest: Partial<ImageRequest>): Promise<ImagineResponse | null> {
        return new Promise<ImagineResponse | null>((resolve) => {
            resolve({ url: CHUBBY_KITTY, seed: 0 });
        });
    }

    imageToImage(imageToImageRequest: Partial<ImageToImageRequest>): Promise<ImagineResponse | null> {
        return new Promise<ImagineResponse | null>((resolve, _reject) => {
            imageToImageRequest = {...DEFAULT_IMAGE_TO_IMAGE_REQUEST, ...imageToImageRequest}
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                resolve(null);
                return;
            }

            canvas.style.display = 'none';

            const image1 = new Image();
            const image2 = new Image();

            image1.onload = () => {
                canvas.width = image1.width;
                canvas.height = image1.height;
                ctx.drawImage(image1, 0, 0);

                image2.onload = () => {
                    ctx.globalAlpha = imageToImageRequest.strength;
                    ctx.drawImage(image2, 0, 0, canvas.width, canvas.height);
                    ctx.globalAlpha = 1;

                    const mixedImageUrl = canvas.toDataURL();
                    resolve({url: mixedImageUrl, seed: 0});
                    canvas.width = 0;
                    canvas.height = 0;
                    canvas.remove();
                };

                image2.onerror = (error) => {
                    resolve(null);
                };

                image2.src = CHUBBY_KITTY;
            };

            image1.onerror = (error) => {
                resolve(null);
            };

            image1.src = imageToImageRequest.image;
        });
    }

    async convertFileToBase64(file) {
        const arrayBuffer = await file.arrayBuffer();
        let binary = '';
        const bytes = new Uint8Array(arrayBuffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    async animateImage(animateImageRequest: Partial<AnimateImageRequest>): Promise<ImagineResponse | null> {
        try {
            animateImageRequest = {...DEFAULT_ANIMATION_REQUEST, ...animateImageRequest};
            const ffmpeg: FFmpeg = new FFmpeg();
            await ffmpeg.load();

            let inputFileName = 'image.png';
            if(animateImageRequest.image.includes('https:')) {
                const chunks = animateImageRequest.image.split('/');
                inputFileName = chunks[chunks.length - 1];
            }
            const outputFileName = 'output.mp4';
            const imageData = await fetch(animateImageRequest.image).then((response) => response.arrayBuffer());
            await ffmpeg.writeFile(inputFileName, new Uint8Array(imageData));

            await ffmpeg.exec(
                ['-i', inputFileName,
                '-vf', 'rotate=angle=45*sin(t/2):fillcolor=none,scale=w=iw/2:h=ih/2',
                '-t', '3',
                '-c:v', 'libx264',
                '-pix_fmt', 'yuv420p',
                outputFileName]
            );

            const videoData = await ffmpeg.readFile(outputFileName);
            const base64String = await this.convertFileToBase64(videoData);

            await ffmpeg.unmount(inputFileName);
            await ffmpeg.unmount(outputFileName);
            return {url: `data:video/mp4;base64,${base64String}`, seed: 0};
        } catch (except: any) {
            console.error(`Unexpected error making mock video. Are you on an older browser? Error: ${except}`);
            return null;
        }
    }

    async inpaintImage(inpaintRequest: Partial<InpaintRequest>): Promise<ImagineResponse | null> {
        inpaintRequest = { ...DEFAULT_INPAINT_REQUEST, ...inpaintRequest };

        if (inpaintRequest.mask == null) {
            return Promise.resolve({ url: CHUBBY_KITTY, seed: 0 });
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const image = new Image();
        image.src = inpaintRequest.image;
        await new Promise((resolve) => (image.onload = resolve));

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const mask = new Image();
        mask.src = inpaintRequest.mask;
        await new Promise((resolve) => (mask.onload = resolve));

        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(mask, 0, 0, canvas.width, canvas.height);

        const kittyImage = new Image();
        kittyImage.src = CHUBBY_KITTY;
        await new Promise((resolve) => (kittyImage.onload = resolve));

        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(kittyImage, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL();

        return { url: dataUrl, seed: 0 };
    }

    async removeBackground(removeRequest: Partial<RemoveBackgroundRequest>): Promise<ImagineResponse | null> {
        removeRequest = { ...DEFAULT_BACKGROUND_REMOVAL_REQUEST, ...removeRequest };
        const image = removeRequest.image;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = image;
        await new Promise((resolve) => (img.onload = resolve));

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Make 50 pixels transparent along every edge
        const edgeSize = 50;

        // Top edge
        for (let y = 0; y < edgeSize; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const index = (y * canvas.width + x) * 4;
                data[index + 3] = 0; // Set alpha channel to 0 (transparent)
            }
        }

        // Bottom edge
        for (let y = canvas.height - edgeSize; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const index = (y * canvas.width + x) * 4;
                data[index + 3] = 0;
            }
        }

        // Left edge
        for (let x = 0; x < edgeSize; x++) {
            for (let y = 0; y < canvas.height; y++) {
                const index = (y * canvas.width + x) * 4;
                data[index + 3] = 0;
            }
        }

        // Right edge
        for (let x = canvas.width - edgeSize; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                const index = (y * canvas.width + x) * 4;
                data[index + 3] = 0;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        const dataUrl = canvas.toDataURL();

        return { url: dataUrl, seed: 0 };
    }

    makeVideo(textToVideoRequest: Partial<TextToVideoRequest>): Promise<ImagineResponse | null> {
        return Promise.resolve({
            seed: 0, url: "https://avatars.charhub.io/79b2188d-293d-42cb-ab50-fddbce4b28b9.gif"
        });
    }

    makeMusic(textToMusicRequest: Partial<MusicGenerationRequest>): Promise<ImagineResponse | null> {
        return Promise.resolve({seed: 0, url: "https://media.chub.ai/FadingMemories.mp3"});
    }

    makeSound(foleyRequest: Partial<FoleyRequest>): Promise<ImagineResponse | null> {
        return Promise.resolve({seed: 0, url: "https://media.chub.ai/rain-and-thunder-16705.mp3"});
    }

    speak(textToSpeechRequest: Partial<TextToSpeechRequest>): Promise<ImagineResponse | null> {
        return Promise.resolve({seed: 0, url: "https://media.chub.ai/ElevenLabs_2024-04-27T03%2023%2053_D_ivc_s50_sb79_se26_b_m2.mp3"});
    }

}

