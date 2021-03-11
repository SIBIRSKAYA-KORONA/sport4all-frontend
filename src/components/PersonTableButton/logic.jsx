import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonTableButton from './render';
import { clearPersons } from 'Actions/Person/PersonActions';
import PersonModel from 'Models/PersonModel';

class PersonTableItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.clearPersons();
        PersonModel.instance.savePersons();
    }

    render() {
        return (
            <PersonTableButton onClick={this.handleOnClick}/>
        );
    }
}

PersonTableItem.propTypes = {
    clearPersons: propTypes.func.isRequired,
};

export default connect(null, { clearPersons })(PersonTableItem);
