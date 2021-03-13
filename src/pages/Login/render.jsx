import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';

function LoginPageRender(props) {
    return (
        <div className='page'>
            <Header/>
            <div className='login'>
                <h1 className='login__header'>Вход</h1>
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
                    <input type='submit' value='Login'/>
                </form>
            </div>
            <Footer />
        </div>
    );
}

LoginPageRender.propTypes = {
    onChange: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
    nickname: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
};

export default LoginPageRender;
