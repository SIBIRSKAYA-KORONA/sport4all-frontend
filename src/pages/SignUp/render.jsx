import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';

function SignUpPageRender(props) {
    return (
        <div className='page'>
            <Header/>
            <div className='signup'>
                <h1 className='signup__header'>Регистрация</h1>
                <form onSubmit={props.onSubmit}>
                    <input
                        name='nickname'
                        value={props.nickname}
                        type='text'
                        placeholder='Name'
                        onChange={props.onChange}
                    />
                    <input
                        name='password'
                        value={props.password}
                        type='password'
                        placeholder='Password'
                        onChange={props.onChange}
                    />
                    <input type='submit' value='Sing Up'/>
                </form>
            </div>
            <Footer />
        </div>
    );
}

SignUpPageRender.propTypes = {
    onChange: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
    nickname: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
};

export default SignUpPageRender;
