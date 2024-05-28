
export interface StageFunctionCall {

    /***
     @description The name of the function. It should be short and simple without special characters.
     @example 'search'
     ***/
    functionName: string

    /***
     @description The parameters being passed to the function.
     ***/
    parameters: Record<string, any>

}
