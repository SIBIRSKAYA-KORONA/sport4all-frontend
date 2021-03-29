import * as React from 'react';
import { useEffect, useState } from 'react';

import { Typography, Spin, Form, Input } from 'antd';
const { Title } = Typography;
const { Item } = Form;

import UserModel from 'Models/UserModel';
import { User } from 'Utils/types';


interface IProps {
    user: User
}

const SettingsProfileSection = (props:IProps):JSX.Element => {
    const [userInfo, setUserInfo] = useState({...props.user});

    return (<>
        <Title level={2}>Настройки</Title>
        {props.user
            ? <Form>
                <Item><Input/></Item>
            </Form>
            : <Spin/>
        }
    </>);
};

export default SettingsProfileSection;
