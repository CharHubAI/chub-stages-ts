import {ReactElement} from "react";
import {InitialData} from "./initial";
import {Message} from "./message";
import {LoadResponse} from "./load";
import {Stateful} from "./stateful";
import {MockGenerator, LiveGenerator} from "../services/generation-service";
import {GenerationService} from "./generation/service";
import {MessagingService} from "./messaging/service";
import {LiveMessenger, MockMessenger} from "../services/messaging-service";

/***
 The type returned from beforePrompt and afterResponse.
 ***/
export interface StageResponse<ChatStateType, MessageStateType> extends Stateful<ChatStateType, MessageStateType>, DeprecatedField {

    /***
     @type string | null
     @default null
     @description If not null, the message itself is replaced
      with this value, both in what's sent to the LLM subsequently and in the database. ***/
    modifiedMessage: string | null,

    /***
     @type string | null
     @default null
     @description A string, if any, to add to the end of the
      final prompt sent to the LLM, but that isn't persisted or visible to the user. ***/
    stageDirections: string | null,

    /***
     @type string | null
     @default null
     @description A message, if any, to add to the chat log that is displayed as a system
      message not connected to any character or person in the chat. This way, stage-specific
      messages like computed stat blocks aren't given to the LLM as something that any character said,
      so that the LLM doesn't attempt to output them.
     ***/
    systemMessage: string | null,

    /***
     @type string | null
     @default null
     @description an error message to show briefly at the top of the screen, if any. ***/
    error: string | null

}

interface DeprecatedField {

    /***
     @deprecated This is now the same field as 'stageDirections'. Please use that.
     ***/
    extensionMessage?: string | null

}


/***
 What must be implemented by a stage.
 It will run as a React stage inside of an iFrame.

 @about StateType
  The type that this stage persists message-level state in.
  This is primarily for readability, and not enforced.
 @description This type is saved in the database after each message,
  which makes it ideal for storing things like positions and statuses,
  but not for things like history, which is best managed ephemerally
  in the internal state of the ChubStage class itself.

 @about ConfigType
  The type of the stage-specific configuration of this stage.
 @description This is for things you want people to be able to configure,
  like background color.
 ***/
export abstract class StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType> {

    /***
     @type GenerationService
     @default MockGenerator
     @description An interface to request image generations, edits, videos, et cetera. When not in
      staging or production, this will only return mock and stub responses.
     ***/
    public generator: GenerationService;
    public messenger: MessagingService<ChatStateType>;

    protected constructor(data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>) {
        /***
         This is the first thing called in the stage,
         to create an instance of it.
         The definition of InitialData is at @link https://github.com/CharHubAI/chub-stages-ts/blob/main/src/types/initial.ts
         Character at @link https://github.com/CharHubAI/chub-stages-ts/blob/main/src/types/character.ts
         User at @link https://github.com/CharHubAI/chub-stages-ts/blob/main/src/types/user.ts
         ***/
        if(data.environment == 'staging' || data.environment == 'production') {
            this.generator = new LiveGenerator();
            this.messenger = new LiveMessenger();
        } else {
            this.generator = new MockGenerator();
            this.messenger = new MockMessenger();
        }
    }

    /***
     This is called immediately after the constructor, in case there is some asynchronous code you need to
     run on instantiation.
     The 'success' boolean returned should be false IFF (if and only if), some condition is met that means
     the stage shouldn't be run at all and the iFrame can be closed/removed.
     For example, if a stage displays expressions and no characters have an expression pack,
     there is no reason to run the stage, so it would return false here.
     ***/
    abstract load(): Promise<Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>>;

    /***
     This can be called at any time, typically after a jump to a different place in the chat tree
     or a swipe.
     ***/
    abstract setState(state: MessageStateType): Promise<void>;

    /***
     This is called after someone presses 'send', but before anything is sent to the LLM.
     ***/
    abstract beforePrompt(inputMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>>;

    /***
     This is called immediately after a response from the LLM.
     ***/
    abstract afterResponse(botMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>>;

    /***
     There should be no "work" done here. Just returning the React element to display.
     If you're unfamiliar with React, I've heard good things about
     @https://scrimba.com/learn/learnreact but haven't personally watched/used it.
     ***/
    abstract render(): ReactElement;

}
