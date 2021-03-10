import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

function PersonInputRender(props) {
    return (
        <form className='person-input' onSubmit={props.onSubmit}>
            <input
                name='name'
                value={props.name}
                type='text'
                placeholder='Name'
                onChange={props.onChange}
            />
            <input
                name='surname'
                value={props.surname}
                type='text'
                placeholder='Surname'
                onChange={props.onChange}
            />
            <input type='submit' value='Add' />
        </form>)
}

PersonInputRender.propTypes = {
    onSubmit: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
    surname: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
};

export default PersonInputRender;
