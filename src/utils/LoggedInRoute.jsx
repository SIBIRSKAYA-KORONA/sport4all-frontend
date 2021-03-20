import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { Spin } from 'antd';

import CONST from 'Constants';
import UserModel from 'Models/UserModel';
import { loginUser, logoutUser } from 'Store/User/UserActions';


class LoggedInRoute extends React.Component {
    state = {
        loading: true,
    }

    componentDidMount() {
        if (this.props.isAuthenticated === null) {
            UserModel.getProfile()
                .then(user => user && this.props.loginUser())
                .catch(() => {
                    this.props.logoutUser();
                    this.setState({ loading:false })
                });
        }
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const { component: Component, ...rest } = this.props;
        return <Route {...rest} render={props => this.state.isAuthenticated
            ? <Component {...props} />
            : this.state.loading
                ? <Spin/>
                : <Redirect to={{ pathname: CONST.PATHS.login, state: { from: this.props.location } }} />
        }/>
    }
}

LoggedInRoute.propTypes = {
    location: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired,
    logoutUser: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser, logoutUser })(LoggedInRoute);
