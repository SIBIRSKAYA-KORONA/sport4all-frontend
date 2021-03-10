import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

function PersonTableButton(props) {
    return (
        <div className='person-table-button'>
            <div className='person-table-button__icon' onClick={props.onClick}>&#215;</div>
            <label className='person-table-button__label'>Remove all persons</label>
        </div>
    );
}

PersonTableButton.propTypes = {
    onClick: propTypes.func.isRequired,
};

export default PersonTableButton;
