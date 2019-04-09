import { removeInstance, saveInstance, updateInstance } from '../actions/modelActions';
import { store } from '../store';

/**
 * Utility Model to save the instances for different models.
 * @export
 * @class BaseModel
 * @template P
 */
export class BaseModel<P> {
    static resource: string;
    resource: string;
    static constraint;
    static defaultProps;

    constructor(public props: P & { id?: string }) {
        this.resource = this.constructor['resource'];
        this.props = props;
    }

    /**
     * Returns the concatination of resource name and id.
     * @param {*} [id]
     * @returns {string}
     * @memberof BaseModel
     */
    getStoreKey(id?): string { return `${this.resource}${id || this.props.id}`; }

    /**
     * Creates a new instance for the model which it is called.
     * @returns {BaseModel<P>}
     * @memberof BaseModel
     */
    $save(): BaseModel<P> {
        saveInstance(this, this.getStoreKey(), this.resource);
        return this;
    }

    /**
     * Updates the instance using the key for the model it is called with new props.
     * @param {string} [key='']
     * @returns {BaseModel<P>}
     * @memberof BaseModel
     */
    $update(key: string = ''): BaseModel<P> {
        updateInstance(`${key
            ? `${this.resource}${key}`
            : this.getStoreKey()}`, this);
        return this;
    }


    /**
     * Saves all the model instances passed to the function using for loop iteration.
     * @static
     * @template T
     * @param {T[]} instances
     * @memberof BaseModel
     */
    static saveAll<T extends BaseModel<{}>>(instances: T[]): void {
        for (let instance of instances) {
            if (!validateObject(instance, this['constraints'])) {
                throw Error;
            }
        }
        instances.map((instance, value) => {
            saveInstance(instance, instance.getStoreKey(), instance.resource);
        });
    }

    /**
     * Removes the instance from the store for the passed id
     * @param {string} id
     * @memberof BaseModel
     */
    $delete(id: string): void {
        removeInstance(this.getStoreKey(id));
    }

    /**
     * Returns a single instance using the id passed by user.
     * @static
     * @param {string} id
     * @param {*} [state=store.getState()]
     * @returns
     * @memberof BaseModel
     */
    static get(id: string, state = store.getState()) {
        let modelState = state.models;
        if (!modelState) {
            return;
        }
        let storeKey: string = `${this.resource}${id}`;
        return modelState.toJS
            ? modelState.get(storeKey)
            : modelState[storeKey];
    }

    /**
     * Returns a array of instance matching the particular resource name.
     * @static
     * @param {*} [state=store.getState()]
     * @returns
     * @memberof BaseModel
     */
    static list(state = store.getState()) {
        return state
            .models
            .filter(instance => {
                return instance.resource === this.resource
            }).toArray()
    }

    /**
     * Deletes all the instance for the model it is called.
     * @static
     * @param {*} [instances=this.list()]
     * @memberof BaseModel
     */
    static deleteAll(instances = this.list()) {
        instances.map(instance => removeInstance(instance.getStoreKey()));
    }

    /**
     * A custom base model function to get a single instance from the matching key and value pair in the modal props.
     * @static
     * @param {string} reference
     * @param {string} value
     * @returns
     * @memberof BaseModel
     */
    static getBy(reference: string, value: string) {
        const instances = this.list();
        return instances.find(instance => {
            if (instance.props[reference] === value) {
                return instance;
            }
        });
    }
}


function validateObject(obj: Object, rules: Object): boolean {
    for (let prop in rules) {
        if (rules.hasOwnProperty(prop)) {
            let constraint = rules[prop];
            if (!constraint(obj[prop])) {
                return false;
            }
        }
    }
    return true;
}
