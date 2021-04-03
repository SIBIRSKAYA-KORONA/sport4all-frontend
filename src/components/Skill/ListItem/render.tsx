import * as React from 'react';

import { Space, Typography, Avatar } from 'antd';
const { Title, Text } = Typography;

import { Skill } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';


interface IProps {
    skill: Skill,
}

const SkillListItem = (props:IProps):JSX.Element => {
    return (<Space direction='vertical' size='small'>
        <Title level={4}>{props.skill.name}</Title>
        {props.skill.approved && props.skill.approved.length > 0
            ? <Avatar.Group
                maxCount={5}
                size='small'
            >
                {props.skill.approved.map(user => <Avatar key={user.id} >{lettersForAvatar(user.name)}</Avatar>)}
            </Avatar.Group>
            : <Text type='secondary'>Не подтверждено</Text>
        }
    </Space>);
};

export default SkillListItem;

// TODO: add avatars of people who approved
