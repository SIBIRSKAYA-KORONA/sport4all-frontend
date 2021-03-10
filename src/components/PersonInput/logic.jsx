import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonInputRender from './render';
import { addPerson } from 'Actions/Person';
import PersonModel from 'Models/PersonModel';

class PersonInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.name.length === 0 || this.state.surname.length === 0) {
            return;
        }
        const person = {
            name: this.state.name,
            surname: this.state.surname,
        };
        this.props.addPerson(person);
        PersonModel.instance.savePersons().then(() => {
            this.setState({
                name: '',
                surname: '',
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
            <PersonInputRender
                onSubmit={this.handleSubmit}
                onChange={this.handleInputChange}
                {...this.state}
            />
        )
    }
}

PersonInput.propTypes = {
    addPerson: propTypes.func.isRequired,
};

export default connect(null, { addPerson })(PersonInput);
