import * as React from 'react';

import { Space, Typography, Avatar, Row, Col, Button, message } from 'antd';
const { Title, Text } = Typography;

import { Skill } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';
import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import SkillsModel from 'Models/SkillsModel';


interface IProps {
    skill: Skill,
    canEdit: boolean,
    pid: number,
}

const SkillListItem = (props:IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(false);
    const onSkillApprove = () => {
        setLoading(true);
        SkillsModel.approveSkill(props.pid, props.skill.id)
            .then(() => message.success('Навык подтверджён'))
            .catch(() => message.error('Ошибка!'))
            .finally(() => setLoading(false));
    };

    const onSkillDelete = () => {
        message.error('Я ещё не умею удалять навыки');
    };
    return (<Row>
        <Col flex='auto'>
            <h4>{props.skill.name}</h4>
            {props.skill.approved && props.skill.approved.length > 0
                ? <Avatar.Group
                    maxCount={5}
                    size='small'
                >
                    {props.skill.approved.map(user => <Avatar key={user.id} >{lettersForAvatar(user.name)}</Avatar>)}
                </Avatar.Group>
                : <Text type='secondary'>Не подтверждено</Text>
            }
        </Col>
        <Col>
            {props.canEdit
                ? <Button icon={<MinusOutlined/>} danger onClick={onSkillDelete}>Удалить</Button>
                : <Button icon={<CheckOutlined/>} onClick={onSkillApprove} loading={loading}>Подтвердить</Button>
            }
        </Col>
    </Row>);
};

export default SkillListItem;
