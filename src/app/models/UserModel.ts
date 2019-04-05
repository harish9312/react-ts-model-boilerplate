import { BaseModel } from './BaseModel';

interface IUserModelProps {
    id: string;
    name: string;
}

export class UserModel extends BaseModel<IUserModelProps> {
    constructor(props: IUserModelProps) {
        super(props);
    }

    static resource = 'user';
}
