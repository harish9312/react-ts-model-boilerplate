import { OrderedMap } from 'immutable';
import { SAVE_INSTANCE, REMOVE_INSTANCE, UPDATE_INSTANCE } from '../constants/actions';

/**
 * Reducer to store the model instances.
 * @export
 * @param {*} [state=OrderedMap({})]
 * @param {*} action
 * @returns
 */
export function modelReducer(state = OrderedMap({}), action: any) {
    switch (action.type) {
        case SAVE_INSTANCE:
            return state.set(action.key, action.instance);
        case UPDATE_INSTANCE:
            return state.set(action.key, action.instance);
        case REMOVE_INSTANCE:
            return state.delete(action.key);
        default:
            return state;
    }
}
