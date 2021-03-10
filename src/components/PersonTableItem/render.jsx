import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

function PersonTableItemRender(props) {
    return (
        <tr className='person-table-item'>
            <td>{props.name}</td>
            <td>{props.surname}</td>
            <td onClick={props.onClick}>&#215;</td>
        </tr>
    )
}

PersonTableItemRender.propTypes = {
    onClick: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
    surname: propTypes.string.isRequired,
};

export default PersonTableItemRender;
