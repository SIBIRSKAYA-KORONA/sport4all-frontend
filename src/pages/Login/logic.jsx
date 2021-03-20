import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginPageRender from './render';
import UserModel from 'Models/UserModel';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        if (!values.password || !values.nickname) return;
        UserModel.getLogin(values).then(() => {
            this.props.history.push('/teams/list');
        });
    }

    render() {
        return (
            <LoginPageRender onSubmit={this.handleSubmit} />
        )
    }
}

LoginPage.propTypes = {
    history: propTypes.object.isRequired,
};

export default connect(null, null)(LoginPage);
