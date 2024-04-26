
export interface Stateful<ChatStateType, MessageStateType> {

    /***
     @type null | ChatStateType
     @default null
     @description Any state information unique to a chat,
      that applies to _ALL_ branches and paths such
      as clearing fog-of-war. It is usually unlikely you will need this.
     ***/
    chatState: null | ChatStateType

    /***
     @type null | MessageStateType
     @default null
     @description The new message-level state after the message has been processed.
      For a new chat, or when added to an existing chat,
      this will be null. ***/
    messageState: MessageStateType | null,

}

export interface InitialState<InitStateType, ChatStateType, MessageStateType> extends Stateful<ChatStateType, MessageStateType> {

    /***
     @type null | InitStateType
     @default null
     @description If there is any state unique to a chat, like procedurally generated
      terrain that is only created _ONCE_ and _ONLY ONCE_ per chat, that you returned from
      a previous load(), it will be passed in here. If your load() returns a non-null
      value for initState and this is null, then this is the first instantiation of your
      component for this chat. If not, then the chat has been started before.
     ***/
    initState: null | InitStateType

}
