import {v4} from "uuid";

export const ALLOWED_ORIGINS = new Set(['https://venus.chub.ai',
    'https://chat.chub.ai',
    'https://chub.ai',
    'https://www.chub.ai',
    'https://ext-beta.chub-ui.pages.dev',
    // For the mobile application these are necessary.
    'capacitor://localhost', 'http://localhost',
    'file://127.0.0.1',
    'file://localhost', 'https://127.0.0.1', 'https://localhost',
    'http://127.0.0.1', 'capacitor://127.0.0.1',
    'http://localhost:5173', 'file://', 'capacitor://']);


export function sendMessageAndAwait<ResponseType>(messageTypeSending: string,
                                                  message: any,
                                                  timeout: number = 60): Promise<ResponseType | null> {
    return new Promise((resolve, _reject) => {
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
        }, timeout * 1000); // 60 seconds timeout
    });
}
