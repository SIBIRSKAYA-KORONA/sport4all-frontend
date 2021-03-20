import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import SignUpPageRender from './render';
import UserModel from 'Models/UserModel';
import CONST from 'Constants';
import { loginUser, logoutUser } from 'Store/User/UserActions';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
        };

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
        const user = values;
        if (!user.password || !user.nickname) return;
        UserModel.signUp(user)
            .then(() => {
                this.props.loginUser();
                this.props.history.push(CONST.PATHS.profile);
            })
            .catch(error => { this.setState({ error: error }) });
    }

    render = () => (<SignUpPageRender onSubmit={this.handleSubmit} {...this.state}/>)
}

SignUpPage.propTypes = {
    history: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired,
    logoutUser: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser, logoutUser })(SignUpPage);
