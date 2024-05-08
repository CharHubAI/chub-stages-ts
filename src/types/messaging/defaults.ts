import {EnvironmentRequest, ImpersonateRequest} from "./request";

export const DEFAULT_IMPERSONATION: ImpersonateRequest = {
    message: '', speaker_id: '1'
}

export const DEFAULT_ENV_UPDATE: EnvironmentRequest = {
    background: null
}