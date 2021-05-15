import './style.scss';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Form, Input, Button, message } from 'antd';

import { PATHS } from 'Constants';
import UserModel from 'Models/UserModel';
import BasePage from 'Components/BasePage/render';
import HttpStatusCode from 'Utils/httpErrors';


const LoginPageRender = (props: RouteComponentProps):JSX.Element => {
    function handleSubmit(values) {
        if (!values.password || !values.nickname) return;
        UserModel.getLogin(values)
            .then(() => UserModel.getProfile())
            .then(() => this.props.history.push(PATHS.root))
            .catch(e => {
                switch (e) {
                case HttpStatusCode.PRECONDITION_FAILED: message.error('Неправильный пароль'); break;
                case HttpStatusCode.NOT_FOUND: message.error('Пользователя с таким логином не существует'); break;
                }
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
                        <Input autoFocus/>
                    </Form.Item>
                    <Form.Item
                        label='Пароль'
                        name='password'
                        rules={[{ message: 'Введите пароль' }]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='login__button'>Войти</Button>
                    </Form.Item>
                </Form>
                <Button type='link'>
                    <Link to={PATHS.signup}>Или зарегистрируйтесь</Link>
                </Button>
            </div>
        </BasePage>
    );
}

export default LoginPageRender;
