import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { Spin } from 'antd';

import { PATHS } from 'Constants';
import UserModel from 'Models/UserModel';
import { loginUser, logoutUser } from 'Store/User/UserActions';


class AuthedRoute extends React.Component {
    state = {
        loading: this.props.isAuthenticated === null,
    }

    componentDidMount() {
        if (this.props.isAuthenticated === null) {
            UserModel.checkAndSetAuth().finally(() => { this.setState({ loading: false }) });
        }
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const { component: Component, mustBeLogged, ...rest } = this.props;

        return <Route {...rest} render={props => this.state.loading
            ? <Spin/>
            : (this.props.isAuthenticated && mustBeLogged === 'in') || (!this.props.isAuthenticated && mustBeLogged === 'out')
                ? <Component {...props} />
                : <Redirect to={{ pathname: mustBeLogged === 'in' ? PATHS.login : PATHS.profile.base, state: { from: this.props.location } }} />
        }/>
    }
}

AuthedRoute.propTypes = {
    mustBeLogged: propTypes.oneOf(['in', 'out']),
    location: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired,
    logoutUser: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser, logoutUser })(AuthedRoute);
