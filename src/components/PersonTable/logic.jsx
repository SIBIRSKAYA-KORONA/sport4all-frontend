import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonTableRender from './render';
import { loadPersons } from 'Actions/Person';
import PersonModel from 'Models/PersonModel';

class PersonTable extends React.Component {
    constructor(props) {
        super(props);
        this.getPersons = this.getPersons.bind(this);

        if (props.persons.length === 0) {
            this.state = {
                loading: true,
            };
            setTimeout(() => this.getPersons(), 2000);
            PersonModel.instance.loadPersons().then(persons => {
                props.loadPersons(persons);
            });
        } else {
            this.state = {
                loading: false,
            }
        }
    }

    async getPersons() {
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <PersonTableRender
                persons={this.props.persons}
                {...this.state}/>
        )
    }
}

PersonTable.propTypes = {
    persons: propTypes.array.isRequired,
    loadPersons: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
    persons: state.persons
});

export default connect(mapStateToProps, { loadPersons })(PersonTable);
