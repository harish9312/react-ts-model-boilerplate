import { removeInstance, saveInstance, updateInstance } from '../actions/modelActions';
import { store } from '../store';

export class BaseModel<P> {
    static resource: string;
    resource: string;
    static constraint;
    static defaultProps;

    constructor(public props: P & { id?: string }) {
        this.resource = this.constructor['resource'];
        this.props = props;
    }

    getStoreKey(): string { return `${this.resource}${this.props.id}`; }

    $save(): BaseModel<P> {
        saveInstance(this, this.getStoreKey(), this.resource);
        return this;
    }

    $update(key: string = ''): BaseModel<P> {
        updateInstance(`${key
            ? `${this.resource}${key}`
            : this.getStoreKey()}`, this);
        return this;
    }

    $delete(casecade: boolean = true): void {
        removeInstance(this.getStoreKey());
    }

    // $saveFiltered(key: string): BaseModel<P> {
    //     if (!this.validate()) {
    //         throw Error;
    //     }
    //     saveFilteredInstance(this, `${key}${this.props.id}`, key);
    //     return this;
    // }


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

    static getAllFormIds(): string[] {
        const instances = this.list();
        let ids = [];
        instances.forEach(instance => {
            ids.concat(instance.props.id);
        });
        return ids;
    }

    static getBy(reference: string, value: string) {
        const instances = this.list();
        return instances.find(instance => {
            if (instance.props[reference] === value) {
                return instance;
            }
        });
    }

    static getAllBy(reference: string, value: string) {
        const instances = this.list();
        return instances.filter(instance => { return instance.props[reference] === value; });
    }

    static getFiltered(filterBy: string, state = store.getState()) {
        return state
            .models
            .filter(instance => instance.props.filterBy === filterBy)
            .toArray();
    }

    static list(state = store.getState()) {
        return state
            .models
            .filter(instance => {
                return instance.resource === this.resource
            }).toArray()
    }

    static getAllByType(type, state = store.getState()) {
        const instances = this.list();
        return instances.filter(instance => { return instance.props.type === type; });
    }

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

    static deleteAll(instances = this.list()) {
        instances.map(instance => removeInstance(instance.getStoreKey()));
    }

    static deleteAllFiltered<T extends BaseModel<{}>>(instances: T[], filterBy: string): void {
        instances.map(instance => removeInstance(`${filterBy}${instance.props.id}`));
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
