import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import SetupsListItem from 'Components/SetupsListItem/render';

function SetupsList(props) {
    return (
        <div className='setups-list'>
            {props.setups.map((item, index) => <SetupsListItem setup={item} index={index + 1} key={item.link}/>)}
        </div>
    )
}

SetupsList.propTypes = {
    setups: propTypes.array.isRequired,
};

export default SetupsList;
