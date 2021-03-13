import * as React from 'react';
import PropTypes from 'prop-types'
import './style.scss';


function BasePage(props) {
    return (
        <div className='base-page'>
            <div className='base-page__content'>
                {props.children}
            </div>
        </div>
    );
}

BasePage.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default BasePage;
