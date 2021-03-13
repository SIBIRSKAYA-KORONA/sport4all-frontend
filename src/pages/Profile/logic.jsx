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
            nickname: '',
        };

        UserModel.instance.getLogin()
            .then(response => {
                console.log(response);
                if (response) {
                    this.setState({
                        loggedIn: true,
                        nickname: response.nickname
                    });
                } else {
                    this.setState({
                        loggedIn: false
                    });
                }
            });
    }

    render() {
        return (
            <ProfilePageRender
                {...this.state}
            />
        )
    }
}

ProfilePage.propTypes = {
    history: propTypes.object.isRequired,
};

export default connect(null, null)(ProfilePage);
