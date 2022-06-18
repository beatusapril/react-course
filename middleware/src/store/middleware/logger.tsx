import { Middleware } from 'redux'

export const logger: Middleware = storeApi => next => action => {
    let result;
    console.groupCollapsed("dispatching", action.type);
    console.log("prev state", storeApi.getState());
    console.log("action", action);
    result = next(action);
    console.log("next state", storeApi.getState());
    console.groupEnd();
    return result;
}