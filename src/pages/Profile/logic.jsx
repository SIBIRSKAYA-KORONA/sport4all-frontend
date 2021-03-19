import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfilePageRender from './render';
import UserModel from 'Models/UserModel';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null, // null, false, true
        };
    }

    componentDidMount() {
        UserModel.instance.getProfile().then(user => {
            console.log(user);
            if (user) {
                this.setState({
                    loggedIn: true,
                    user: user,
                });
            } else {
                this.setState({
                    loggedIn: false
                });
            }
        });
    }

    render = () => (
        <ProfilePageRender
            {...this.state}
        />
    );
}

ProfilePage.propTypes = {
    history: propTypes.object.isRequired,
};

export default connect(null, null)(ProfilePage);
