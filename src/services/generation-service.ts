import {ImageRequest, ImageResponse, ImageToImageRequest} from "../types/generation/images";
import {GENERATION_REQUESTS} from "../types/generation/constants";
import {ALLOWED_ORIGINS} from "./messaging";
import { v4 } from 'uuid';

function sendMessageAndAwait<ResponseType>(messageTypeSending: string, message: any): Promise<ResponseType | null> {
    return new Promise((resolve, reject) => {
        const uuid: string = v4();
        message['uuid'] = uuid;
        let responded = false;
        const handleResponse = (event: any) => {
            if (event.source === window.parent && ALLOWED_ORIGINS.has(event.origin)) {
                const { messageType, data } = event.data;
                if(messageType == uuid) {
                    window.removeEventListener("message", handleResponse);
                    if(data.hasOwnProperty('error') && data.error != null) {
                        console.error(`Error for ${messageTypeSending}, error: ${data.error}`);
                        resolve(null);
                    }
                    resolve(data);
                }
            }
        };
        window.addEventListener("message", handleResponse);
        window.parent.postMessage({"messageType": messageTypeSending, "data": message}, '*');

        setTimeout(() => {
            window.removeEventListener("message", handleResponse);
            if(!responded) {
                console.error(`Response timeout for ${messageTypeSending}`);
                resolve(null);
            }
        }, 60000); // 60 seconds timeout
    });
}

function makeImage(textToImageRequest: ImageRequest): Promise<ImageResponse | null> {
    return sendMessageAndAwait<ImageResponse>(GENERATION_REQUESTS.TEXT2IMAGE, textToImageRequest);
}

function imageToImage(imageToImageRequest: ImageToImageRequest): Promise<ImageResponse | null> {
    return sendMessageAndAwait<ImageResponse>(GENERATION_REQUESTS.IMAGE2IMAGE, imageToImageRequest);
}

export const generationService = {
    makeImage,
    imageToImage
};
