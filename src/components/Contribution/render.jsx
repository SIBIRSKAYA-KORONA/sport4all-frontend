import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

function ContributionRender(props) {
    return (
        <div className='contribution'>
            <img className='contribution__icon' src={props.icon} alt={props.title}/>
            <a className='contribution__title' href={props.link} target='_blank' rel='noopener noreferrer'>
                <h1>{props.title}</h1>
            </a>
            <div className='contribution__message'>{props.message}</div>
        </div>
    );
}

ContributionRender.propTypes = {
    icon    :propTypes.string.isRequired,
    title   :propTypes.string.isRequired,
    link    :propTypes.string.isRequired,
    message :propTypes.string.isRequired,
};

export default ContributionRender;
