import {MessagingResponse} from "./response";


export interface MessagingService<ChatStateType> {

    /***
     ***/
    updateChatState(chatState: ChatStateType): Promise<MessagingResponse>;

}