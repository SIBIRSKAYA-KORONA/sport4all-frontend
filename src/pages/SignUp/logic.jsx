import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import SignUpPageRender from './render';
import UserModel from 'Models/UserModel';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const user = values;
        const t = this;
        if (!user.password || !user.nickname) return;
        UserModel.instance.signUp(user)
            .then(() => { t.props.history.push('/teams/list'); })
            .catch(error => { this.setState({ error: error }) });
    }

    render = () => (<SignUpPageRender onSubmit={this.handleSubmit} error={this.state.error}/>)
}

SignUpPage.propTypes = {
    history: propTypes.object.isRequired,
};

export default connect(null, null)(SignUpPage);
