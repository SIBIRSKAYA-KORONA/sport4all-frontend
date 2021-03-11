import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonTableItemRender from 'Components/PersonTableItem/render';
import { removePerson } from 'Actions/Person/PersonActions';
import PersonModel from 'Models/PersonModel';

class PersonTableItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.removePerson({name: this.props.name, surname: this.props.surname});
        PersonModel.instance.savePersons();
    }

    render() {
        return (
            <PersonTableItemRender
                name={this.props.name}
                surname={this.props.surname}
                onClick={this.handleOnClick}/>
        );
    }
}

PersonTableItem.propTypes = {
    removePerson    : propTypes.func.isRequired,
    name            : propTypes.string.isRequired,
    surname         : propTypes.string.isRequired,
};

export default connect(null, { removePerson })(PersonTableItem);
