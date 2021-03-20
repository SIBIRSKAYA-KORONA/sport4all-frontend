import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfilePageRender from './render.tsx';
import UserModel from 'Models/UserModel';
import { loginUser } from 'Store/User/UserActions';
import CONST from 'Utils/constants';
import {NotAuthorizedError} from 'Utils/errors';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.isAuthenticated === false) {
            this.props.history.push(CONST.PATHS.login);
        } else {
            UserModel.getProfile().then(user => {
                if (user) {
                    if (!this.props.isAuthenticated) this.props.loginUser();
                    this.setState({
                        user: user,
                    });
                }
            }).catch(error => {
                switch (error) {
                case NotAuthorizedError: this.props.history.push(CONST.PATHS.login); break;
                default: console.error(error);
                }
            });
        }
    }

    render = () => (
        <ProfilePageRender
            {...this.state}
            {...this.props}
        />
    );
}

ProfilePage.propTypes = {
    history: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(ProfilePage);
