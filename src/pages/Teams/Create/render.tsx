import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Form, Input, Button, message } from 'antd';

import { PATHS } from 'Constants';
import { Team } from 'Utils/types';
import TeamModel from 'Models/TeamModel';
import { ProfileSections } from 'Utils/enums';
import BasePage from 'Components/BasePage/render';


const TeamCreatePage = (props:RouteComponentProps):JSX.Element => {
    const handleSubmit = (values) => {
        if (!values.name) return;
        // todo: handle 409 error
        TeamModel.createTeam(values)
            .then((team:Team) => props.history.push(PATHS.teams.id(team.id)))
            .catch(e => {
                message.error(e);
                props.history.push(PATHS.profile.section(ProfileSections.Teams));
            });
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
                        <Input autoFocus/>
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
