import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import LoginPageRender from './render';
import UserModel from 'Models/UserModel';
import { IUserAction, loginUser, logoutUser } from 'Store/User/UserActions';
import { UserAuthenticatedType } from 'Store/User/UserState';
import CONST from 'Constants';
import { ProfileSections } from 'Utils/enums';

interface IProps extends RouteComponentProps  {
    isAuthenticated: UserAuthenticatedType,
    loginUser: IUserAction,
    logoutUser: IUserAction
}

class LoginPage extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        if (!values.password || !values.nickname) return;
        UserModel.getLogin(values)
            .then(() => {
                this.props.loginUser();
                this.props.history.push(CONST.PATHS.profile.section(ProfileSections.Settings));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render = ():JSX.Element => (
        <LoginPageRender onSubmit={this.handleSubmit} />
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser, logoutUser })(LoginPage);
