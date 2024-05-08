import {MessagingResponse} from "./response";
import {EnvironmentRequest, ImpersonateRequest, NudgeRequest} from "./request";


export interface MessagingService<ChatStateType> {

    /***
     This will set the chat state when called, outside of times when
     chat state is requested from your stage interface.
     ***/
    updateChatState(chatState: ChatStateType): Promise<MessagingResponse>;

    /***
     This will create a new message that appears as if it comes from the speaker indicated.
     Note that if the speaker being impersonated is a bot, your stage will have
     afterResponse called on it.
     ***/
    impersonate(impersonationRequest: Partial<ImpersonateRequest>): Promise<MessagingResponse>;

    /***
     Update certain things about the environment, like the chat's background image.
     ***/
    updateEnvironment(environmentUpdateRequest: Partial<EnvironmentRequest>): Promise<MessagingResponse>;

    /***
     Request a new message from a bot.
     Note that your stage will have beforePrompt and afterResponse called for it.
     ***/
    nudge(nudgeRequest: Partial<NudgeRequest>): Promise<MessagingResponse>;

}