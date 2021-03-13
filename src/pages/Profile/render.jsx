import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';

function ProfilePageRender(props) {
    return (
        <div className='page'>
            <Header/>
            <div className='login'>
                {props.loggedIn &&
                    props.nickname
                    ? <h1 className='login__header'>{props.nickname}</h1>
                    : <h1 className='login__header'>Not authorized</h1>
                }
            </div>
            <Footer />
        </div>
    );
}

ProfilePageRender.propTypes = {
    loggedIn: propTypes.bool,
    nickname: propTypes.string,
};

export default ProfilePageRender;
