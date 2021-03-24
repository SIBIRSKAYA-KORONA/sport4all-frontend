import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import TeamModel from 'Models/TeamModel';
import BasePage from 'Components/BasePage/render';


const TeamCreatePage = (props:RouteComponentProps):JSX.Element => {
    const handleSubmit = (values) => {
        if (!values.name) return;
        // todo: handle 409 error
        TeamModel.instance.createTeam(values)
            .then(() => { props.history.push('/profile'); })
            .catch(e => { console.error(e); })
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return (
        <BasePage {...props}>
            <div className='create-team'>
                <h1>Создайте свою команду</h1>
                <Form {...layout} onFinish={handleSubmit}>
                    <Form.Item name='name' label='Название' rules={[{ required: true, }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='about' label='Описание'>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item name='location' label='Место'>
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Создать</Button>
                    </Form.Item>
                </Form>
            </div>
        </BasePage>
    );
}

export default TeamCreatePage;