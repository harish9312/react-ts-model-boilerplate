import { REMOVE_INSTANCE, SAVE_INSTANCE, UPDATE_INSTANCE } from '../constants/actions';
import { dispatch } from '../utils/generalUtils';
import { BaseModel } from '../models/BaseModel';


/**
 *action to save the BaseModel instance.
 * @param {BaseModel<{}>} instance
 * @param {string} key
 * @param {string} identifier
 */
export function saveInstance(instance: BaseModel<{}>, key: string, identifier: string) {
    return dispatch({
        type: SAVE_INSTANCE,
        instance,
        key
    });
}

/**
 *action to delete the instance
 * @param {string} key
 */
export function removeInstance(key: string) {
    return dispatch({
        type: REMOVE_INSTANCE,
        key
    });
}


/**
 *action to update a single BaseModel instance.
 * @param {string} key
 * @param {*} instance
 */
export function updateInstance(key: string, instance: any) {
    return dispatch({
        type: UPDATE_INSTANCE,
        key,
        instance
    });
}


