import {EnvironmentRequest, ImpersonateRequest, NudgeRequest, SpeechRequest} from "./request";

export const DEFAULT_SPEECH_REQUEST: SpeechRequest = {
    speaker_id: '1', parent_id: null, is_main: true
}

export const DEFAULT_IMPERSONATION: ImpersonateRequest = {
    ...DEFAULT_SPEECH_REQUEST,
    message: ''
}

export const DEFAULT_NUDGE_REQUEST: NudgeRequest = {
    ...DEFAULT_SPEECH_REQUEST,
    stage_directions: null,
    participants: null
}

export const DEFAULT_ENV_UPDATE: EnvironmentRequest = {
    background: null,
    input_enabled: true,
    stage_hidden: false
}

export const ROOT_MESSAGE_PARENT_ID: string = "-2";
