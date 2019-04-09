import { BaseModel } from './BaseModel';

interface IUserModelProps {
    id: string;
    login: string;
    name: string;
    link: string;
}

/**
 * To store the user data coming from the GitHub API.
 * @export
 * @class UserModel
 * @extends {BaseModel<IUserModelProps>}
 */
export class UserModel extends BaseModel<IUserModelProps> {
    constructor(props: IUserModelProps) {
        super(props);
    }

    static resource = 'user';
}
