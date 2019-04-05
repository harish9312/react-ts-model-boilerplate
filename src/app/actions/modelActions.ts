import { REMOVE_INSTANCE, SAVE_INSTANCE, UPDATE_INSTANCE } from '../constants/actions';
import { dispatch } from '../utils/generalUtils';
import { BaseModel } from '../models/BaseModel';

export function saveInstance(instance: BaseModel<{}>, key: string, identifier: string) {
    return dispatch({
        type: SAVE_INSTANCE,
        instance,
        key
    });
}

export function removeInstance(key: string) {
    return dispatch({
        type: REMOVE_INSTANCE,
        key
    });
}

export function updateInstance(key: string, instance: any) {
    return dispatch({
        type: UPDATE_INSTANCE,
        key,
        instance
    });
}


