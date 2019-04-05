import * as React from 'react';
import { UserModel } from '../models/UserModel';

export interface IHomeProps {
}

export class Home extends React.PureComponent<IHomeProps, {}> {
    constructor(props: IHomeProps) {
        super(props);
    }

    componentDidMount() {
        new UserModel({ name: 'Harish Soni', id: '01' }).$save();
    }

    render() {
        return <h1>HOMEPAGE</h1>
    }
}