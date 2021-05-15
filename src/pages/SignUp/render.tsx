import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import { PATHS } from 'Constants';
import UserModel from 'Models/UserModel';
import { ProfileSections } from 'Utils/enums';
import BasePage from 'Components/BasePage/render';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const SignUpPage = (props:RouteComponentProps):JSX.Element => {
    const [error, setError] = React.useState('');
    function onSubmit(values) {
        const user = values;
        if (!user.password || !user.nickname) return; // todo:check error
        UserModel.signUp(user)
            .then(() => UserModel.getProfile())
            .then(() => props.history.push(PATHS.profile.section(user.nickname, ProfileSections.Personal)))
            .catch(error => setError(error));
    }
    return (
        <BasePage {...props}>
            <div className='signup'>
                <h1 className='signup__header'>Регистрация</h1>
                <Form {...layout} onFinish={onSubmit}>
                    <Form.Item
                        label='Никнейм'
                        name='nickname'
                        validateStatus={error ? 'error' : ''}
                        help={error}
                        rules={[{
                            required: true,
                            message: 'Введите ваш никнейм'
                        }]}>
                        <Input autoFocus/>
                    </Form.Item>
                    <Form.Item
                        label='Пароль'
                        name='password'
                        rules={[{
                            required: true,
                            message: 'Введите пароль'
                        }]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label='Имя'
                        name='name'
                        rules={[{
                            required: true,
                            message: 'Иван'
                        }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Фамилия'
                        name='surname'
                        rules={[{
                            required: true,
                            message: 'Иванов'
                        }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Почта'
                        name='email'
                        rules={[{
                            required: true,
                            message: 'ivan.ivanov@ivan.ivanov'
                        }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Создать</Button>
                    </Form.Item>
                </Form>
            </div>
        </BasePage>
    );
}

export default SignUpPage;
