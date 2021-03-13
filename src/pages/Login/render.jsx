import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';
import { Form, Input, Button } from 'antd';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';

function LoginPageRender(props) {
    return (
        <div className='page'>
            <Header/>
            <div className='login'>
                <h1 className='login__header'>Вход</h1>
                <Form name='login' onFinish={props.onSubmit}>
                    <Form.Item
                        label='Никнейм'
                        name='nickname'
                        rules={[{ message: 'Введите ваш никнейм' }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Пароль'
                        name='password'
                        rules={[{ message: 'Введите пароль' }]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Войти</Button>
                    </Form.Item>
                </Form>
            </div>
            <Footer />
        </div>
    );
}

LoginPageRender.propTypes = {
    onSubmit: propTypes.func.isRequired,
};

export default LoginPageRender;
