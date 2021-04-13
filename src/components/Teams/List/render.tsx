import './style.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Avatar, List, Button } from 'antd';
import {
    CheckCircleOutlined,
    MinusCircleOutlined,
    MinusOutlined,
    PlusCircleOutlined,
    PlusOutlined
} from '@ant-design/icons';

import CONST from 'Constants';
import { Team } from 'Utils/types';
import { InviteStatus } from 'Utils/enums';
import { ButtonType } from 'antd/lib/button';
import { lettersForAvatar } from 'Utils/utils';
import { getText, MapOfTextMeta, texts } from 'Components/Invite/List/ItemActions';
import { IProps, TeamListItemAction, TeamListItemActions } from 'Components/Teams/List/interface';


const TeamList = (props:IProps):JSX.Element => {
    const [loadings, setLoadings] = React.useState({});
    const [replied, setReplied] = React.useState<MapOfTextMeta>(parseInvitesToTextMeta());

    function parseInvitesToTextMeta():MapOfTextMeta {
        return props.invites
            ? props.invites.reduce((acc, curr) => ({ ...acc, [curr.team_id]:texts[curr.state] }), {})
            : {};
    }

    async function onClick(key:string, handler:() => Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        return handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    function afterClickCreator(type:InviteStatus) {
        return function(teamID:number) {
            setReplied(prev => ({ ...prev, [teamID]:texts[type] }));
        }
    }

    const buttons = {
        [TeamListItemActions.add]: {
            key:        'add',
            title:      'Добавить',
            icon:       <PlusOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: null
        },
        [TeamListItemActions.delete]: {
            key:        'delete',
            title:      'Удалить',
            icon:       <MinusOutlined/>,
            otherProps: { danger:true },
            afterClick: null
        },
        [TeamListItemActions.sendInvite]: {
            key:        'sendInvite',
            title:      'Вступить',
            icon:       <PlusCircleOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: afterClickCreator(InviteStatus.Pending)
        },
        [TeamListItemActions.accept]: {
            key:        'accept',
            title:      'Принять',
            icon:       <CheckCircleOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: afterClickCreator(InviteStatus.Accepted)
        },
        [TeamListItemActions.reject]: {
            key:        'reject',
            title:      'Отказать',
            icon:       <MinusCircleOutlined/>,
            otherProps: { danger:true },
            afterClick: afterClickCreator(InviteStatus.Rejected)
        },
    };

    function getActionCreator(action:TeamListItemAction) {
        const d = buttons[action.type];
        return function actionCreator(team:Team) {
            const dd = { ...d, key:d.key+team.id };
            return <Button
                {...dd.otherProps}
                loading={loadings[dd.key]}
                key={dd.key}
                icon={dd.icon}
                onClick={() => {
                    onClick(dd.key, action.handler.bind(null, team))
                        .then(() => dd.afterClick && dd.afterClick(team.id))
                }}
            >{dd.title}</Button>
        }
    }

    const actionCreators = props.actions
        ? props.actions.map(action => getActionCreator(action))
        : [];

    return (props.hideEmpty && !props.loading && props.teams?.length === 0
        ? <></>
        : <List
            loading={props.loading}
            style={{ margin: 10 }}
            itemLayout="horizontal"
            dataSource={props.teams}
            locale={{ emptyText:'Нет команд' }}
            renderItem={team => (
                <List.Item
                    style={{ paddingLeft: 10 }}
                    className={'row'}
                    actions={replied[team.id]
                        ? [getText(replied[team.id])]
                        : actionCreators.map(ac => ac(team))
                    }
                >
                    <List.Item.Meta
                        avatar={(
                            <Link to={CONST.PATHS.teams.id(team.id)}>
                                <Avatar src={team.avatar.url}>{lettersForAvatar(team.name)}</Avatar>
                            </Link>
                        )}
                        title={<Link to={CONST.PATHS.teams.id(team.id)}>{team.name}</Link>}
                        description={team.about}
                    />
                </List.Item>
            )}
        />
    );
}

export default TeamList;
