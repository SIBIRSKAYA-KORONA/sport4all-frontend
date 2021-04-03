import './style.scss';
import * as React from 'react';

import { Form, Input, Button, message } from 'antd';

import CONST from 'Constants';
import UserModel from 'Models/UserModel';
import BasePage from 'Components/BasePage/render';
import { RouteComponentProps } from 'react-router-dom';
import HttpStatusCode from 'Utils/httpErrors';


const LoginPageRender = (props: RouteComponentProps):JSX.Element => {
    function handleSubmit(values) {
        if (!values.password || !values.nickname) return;
        UserModel.getLogin(values)
            .then(() => UserModel.getProfile())
            .then(() => this.props.history.push('/'))
            .catch(e => {
                if (e === HttpStatusCode.PRECONDITION_FAILED) message.error('Неправильный пароль');
            });
    }

    return (
        <BasePage {...props}>
            <div className='login'>
                <h1 className='login__header'>Вход</h1>
                <Form name='login' onFinish={handleSubmit}>
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
        </BasePage>
    );
}

export default LoginPageRender;
