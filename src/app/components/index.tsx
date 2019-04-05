import * as React from 'react';
import { UserModel } from '../models/UserModel';
import { getUserData } from '../services/baseService';
import './home.scss';
import { connect } from 'react-redux';

export interface IHomeProps {
    users: UserModel[];
}

export class HomeImpl extends React.PureComponent<IHomeProps, {}> {
    constructor(props: IHomeProps) {
        super(props);
    }

    async componentDidMount() {
        await getUserData();
    }

    renderUserData = () => {
        const { users } = this.props;
        return (users || []).map((userInstance, index) => <div className="card card-1" key={index} >
            {userInstance.props.login}
        </div>
        )
    }

    render() {
        return (this.props.users || []).length ? this.renderUserData() : <h1>Loading Data...</h1>
    }
}

export function mapStateToProps(state) {
    const users = UserModel.list(state);
    return {
        users
    }
};

export const Home = connect(mapStateToProps)(HomeImpl)