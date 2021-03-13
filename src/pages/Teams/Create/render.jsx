import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';

function TeamCreatePageRender(props) {
    return (
        <div className='page'>
            <Header/>
            <div className='create-team'>
                <h1>Создайте свою команду</h1>
                <form onSubmit={props.onSubmit}>
                    <input
                        name='name'
                        type='text'
                        placeholder='name'
                        value={props.name}
                        onChange={props.onChange}
                    />
                    <textarea
                        name='about'
                        placeholder='about'
                        value={props.about}
                        onChange={props.onChange}
                    />
                    <input
                        name='location'
                        type='text'
                        placeholder='location'
                        value={props.location}
                        onChange={props.onChange}
                    />
                    {/*<select name='sport' value={props.sport} onChange={props.onChange}>*/}
                    {/*    {Data.Sports.map(sport => <option key={sport} value={sport}>{sport}</option>)}*/}
                    {/*</select>*/}
                    <input type='submit' value='Создать'/>
                </form>
            </div>
            <Footer />
        </div>
    );
}

TeamCreatePageRender.propTypes = {
    name: propTypes.string.isRequired,
    about: propTypes.string.isRequired,
    location: propTypes.string.isRequired,
    onSubmit: propTypes.func.isRequired,
    onChange: propTypes.func.isRequired,
};

export default TeamCreatePageRender;
