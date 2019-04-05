import { IThunkAction, IAction } from "../../../interfaces";
import { store } from "app/store";

export function keys(object: Object, callback: Function) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            callback(key);
        }
    }
}

export function isEmpty(obj: Object) {
    if (Object.keys(obj).length <= 0 || !obj) {
        return true;
    }
    return false;
}

export function dispatch<T extends IAction>(action: T | IThunkAction) {
    if ((action as IAction).type) {
        return store.dispatch(action as IAction);
    }
    return store.dispatch<{ type: string }>(action as IThunkAction);
}
