import { BaseModel } from './BaseModel';

interface IPostModelProps {
    id: string;
    title: string;
}

/**
 * To store the Posts coming from the jsonplaceholder API.
 * @export
 * @class PostModel
 * @extends {BaseModel<IPostModelProps>}
 */
export class PostModel extends BaseModel<IPostModelProps> {
    constructor(props: IPostModelProps) {
        super(props);
    }

    static resource = 'post';
}
