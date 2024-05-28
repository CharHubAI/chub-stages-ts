import {StageBase, StageResponse} from "./stage";
import {Message} from "./message";
import {GenerationService} from "./generation/service";
import {LoadResponse} from "./load";
import {MessagingService} from "./messaging/service";
import React from "react";


/***
 @description An empty stage, that may be useful to extend when making tools.
 ***/
export class EmptyStage implements StageBase<any, any, any, any> {

    async afterResponse(botMessage: Message): Promise<Partial<StageResponse<any, any>>> {
        return {};
    }

    async beforePrompt(inputMessage: Message): Promise<Partial<StageResponse<any, any>>> {
        return {};
    }

    generator: GenerationService;

    async load(): Promise<Partial<LoadResponse<any, any, any>>> {
        return {};
    }

    messenger: MessagingService<any>;

    render(): React.ReactElement {
        return <></>;
    }

    async setState(state: any): Promise<void> {
        return;
    }

}
