import {MessagingService} from "../types/messaging/service";
import {EnvironmentRequest, ImpersonateRequest, NudgeRequest} from "../types/messaging/request";
import {MessagingResponse} from "../types/messaging/response";
import {sendMessageAndAwait} from "./messaging";
import {MESSAGING_REQUESTS} from "../types/messaging/constants";

export class LiveMessenger implements MessagingService<any> {

    impersonate(impersonationRequest: Partial<ImpersonateRequest>): Promise<MessagingResponse> {
        return sendMessageAndAwait<MessagingResponse>(MESSAGING_REQUESTS.IMPERSONATE, impersonationRequest);
    }

    updateChatState(chatState: any): Promise<MessagingResponse> {
        return sendMessageAndAwait<MessagingResponse>(MESSAGING_REQUESTS.CHAT_STATE, chatState);
    }

    updateEnvironment(environmentUpdateRequest: Partial<EnvironmentRequest>): Promise<MessagingResponse> {
        return sendMessageAndAwait<MessagingResponse>(MESSAGING_REQUESTS.ENVIRONMENT, environmentUpdateRequest);
    }

    nudge(nudgeRequest: Partial<NudgeRequest>): Promise<MessagingResponse> {
        return sendMessageAndAwait<MessagingResponse>(MESSAGING_REQUESTS.NUDGE, nudgeRequest);
    }

}

export class MockMessenger implements MessagingService<any> {

    impersonate(impersonationRequest: Partial<ImpersonateRequest>): Promise<MessagingResponse> {
        return Promise.resolve({success: true, error: null});
    }

    updateChatState(chatState: any): Promise<MessagingResponse> {
        return Promise.resolve({success: true, error: null});
    }

    updateEnvironment(environmentUpdateRequest: Partial<EnvironmentRequest>): Promise<MessagingResponse> {
        return Promise.resolve({success: true, error: null});
    }

    nudge(nudgeRequest: Partial<NudgeRequest>): Promise<MessagingResponse> {
        return Promise.resolve({success: true, error: null});
    }

}