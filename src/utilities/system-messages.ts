
/***
 @description Prints a stat block with a list of actions available.
 ***/
export function availableActions(actions: string[]) {
    return "```\nAvailable Actions:\n[ " +
        actions.join(', ') +
        " ]\n```";
}

export type SimpleType = string | boolean | number | null | undefined | bigint;

/***
 @description Prints a stat block from simple state objects.
 @example
     const systemMessage = currentState({'health': 37, 'items': ['hook', 'line', 'sinker']});
     assert systemMessage == "```\nHealth: 34\nItems: [ hook, line, sinker ]\n```"
 ***/
export function currentState(state: {[key: string]: SimpleType | Array<SimpleType>}): string {
    let result = "```\n";
    for (const key in state) {
        const value = state[key];
        if (Array.isArray(value)) {
            result += `${capitalizeFirstLetter(key)}: [ ${value.join(', ')} ]\n`;
        } else {
            result += `${capitalizeFirstLetter(key)}: ${value}\n`;
        }
    }
    result += "```";
    return result;
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
