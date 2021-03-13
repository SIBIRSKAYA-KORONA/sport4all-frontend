import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginPageRender from './render';
import UserModel from 'Models/UserModel';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.password || !this.state.nickname) return;
        const user = {
            nickname: this.state.nickname,
            password: this.state.password
        };
        UserModel.instance.getLogin(user).then((response) => {
            console.log(response);
            console.log(document.cookie);
            this.setState({
                nickname: '',
                password: '',
            });
        });
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    render() {
        return (
            <LoginPageRender
                onChange={this.handleInputChange}
                onSubmit={this.handleSubmit}
                {...this.state}
            />
        )
    }
}

LoginPage.propTypes = {
    history: propTypes.object.isRequired,
};

export default connect(null, null)(LoginPage);
