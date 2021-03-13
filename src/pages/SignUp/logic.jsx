import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import SignUpPageRender from './render';
import UserModel from 'Models/UserModel';

class SignUpPage extends React.Component {
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
        // this.props.createTeam(team);
        UserModel.instance.signUp(user).then((response) => {
            console.log(response);
            this.setState({
                nickname: '',
                password: '',
            });
            history.push('/profile');
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
            <SignUpPageRender
                onChange={this.handleInputChange}
                onSubmit={this.handleSubmit}
                {...this.state}
            />
        )
    }
}

SignUpPage.propTypes = {
    history: propTypes.object.isRequired,
};

export default connect(null, null)(SignUpPage);
