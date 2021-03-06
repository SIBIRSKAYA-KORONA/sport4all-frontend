import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { Typography, Avatar, Row, Col, Button, message, Space } from 'antd';
const { Text } = Typography;
import { CheckOutlined, MinusOutlined } from '@ant-design/icons';

import { PATHS } from 'Constants';
import { Skill, User } from 'Utils/types';
import SkillsModel from 'Models/SkillsModel';
import { lettersForAvatar } from 'Utils/utils';


interface IProps extends RouteComponentProps {
    skill: Skill,
    canEdit: boolean,
    profile: User,
    reloadSkills: () => Promise<void>,
    userId: number
}

const SkillListItem = (props:IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(false);
    const [canApprove, setCanApprove] = React.useState(props.profile.id !== props.userId && !props.skill.approvals.some(appr => appr.fromUser.id === props.userId));

    function onSkillApprove() {
        setLoading(true);
        SkillsModel.approveSkill(props.profile.id, props.skill.id)
            .then(() => {
                message.success('Навык подтверджён');
                setCanApprove(false);
                props.reloadSkills();
            })
            .catch(() => { message.error('Ошибка!') })
            .finally(() => setLoading(false));
    }

    function onSkillDelete() {
        message.error('Я ещё не умею удалять навыки');
    }

    return (<Row>
        <Col flex='auto'>
            <h4>{props.skill.name}</h4>
            {props.skill.approvals && props.skill.approvals.length > 0
                ? <Space direction='horizontal' size='small'>
                    <Avatar.Group
                        maxCount={5}
                        size='small'
                    >
                        {props.skill.approvals.map(approval => <Avatar key={approval.id}>
                            <Link to={PATHS.profile.nickname(approval.fromUser.nickname)}>{lettersForAvatar(approval.fromUser.name)}</Link>
                        </Avatar>)}
                    </Avatar.Group>
                    <Text type='secondary'>подтвердили</Text>
                </Space>
                : <Text type='secondary'>Не подтверждено</Text>
            }
        </Col>
        <Col>
            {props.canEdit && <Button icon={<MinusOutlined/>} danger onClick={onSkillDelete}>Удалить</Button>}
            {canApprove && <Button icon={<CheckOutlined/>} onClick={onSkillApprove} loading={loading}>Подтвердить</Button>}
        </Col>
    </Row>);
};

export default SkillListItem;
