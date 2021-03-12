import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import Footer from 'Components/Footer/render';
import Data from 'Static/data';

function TeamCreatePageRender(props) {
    return (
        <div className='page'>
            <div className='create-team'>
                <h1>Создайте свою команду</h1>
                <form onSubmit={props.onSubmit}>
                    <input
                        name='title'
                        type='text'
                        value={props.title}
                        onChange={props.onChange}
                    />
                    <textarea
                        name='description'
                        value={props.description}
                        onChange={props.onChange}
                    />
                    <select name='sport' value={props.sport} onChange={props.onChange}>
                        {Data.Sports.map(sport => <option key={sport} value={sport}>{sport}</option>)}
                    </select>
                    <input type='submit' value='Создать'/>
                </form>
            </div>
            <Footer />
        </div>
    );
}

TeamCreatePageRender.propTypes = {
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    sport: propTypes.string.isRequired,
    onSubmit: propTypes.func.isRequired,
    onChange: propTypes.func.isRequired,
};

export default TeamCreatePageRender;
