import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import LoginPageRender from './render';
import UserModel from 'Models/UserModel';
import {IUserAction, loginUser, logoutUser} from 'Store/User/UserActions';
import {UserAuthenticatedType} from 'Store/User/UserState';
import CONST from 'Constants';
import {NotFoundError} from 'Utils/errors';

interface IProps extends RouteComponentProps  {
    isAuthenticated: UserAuthenticatedType,
    loginUser: IUserAction,
    logoutUser: IUserAction
}

class LoginPage extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const onTrue = () => this.props.history.push(CONST.PATHS.profile);
        const onFalse = () => this.setState(prevState => ({ ...prevState, loading: false }));

        switch (this.props.isAuthenticated) {
        case null:
            UserModel.checkAuth()
                .then(() => {
                    this.props.loginUser();
                    onTrue();
                })
                .catch(() => {
                    this.props.logoutUser();
                    onFalse();
                })
            break;
        case true: onTrue(); break;
        case false: onFalse(); break;
        }
    }

    handleSubmit(values) {
        if (!values.password || !values.nickname) return;
        UserModel.getLogin(values)
            .then(() => {
                this.props.loginUser();
                this.props.history.push(CONST.PATHS.profile);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render = ():JSX.Element => (
        <LoginPageRender onSubmit={this.handleSubmit}  {...this.state} />
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser, logoutUser })(LoginPage);
