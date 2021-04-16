import * as React from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Button, List } from 'antd';
import { ButtonType } from 'antd/lib/button';
import {
    CheckCircleOutlined,
    MinusCircleOutlined,
    MinusOutlined,
    PlusOutlined
} from '@ant-design/icons';

import { PATHS } from 'Constants';
import { User } from 'Utils/types';
import { InviteStatus } from 'Utils/enums';
import { lettersForUserAvatar } from 'Utils/structUtils';
import {
    IProps,
    TeamPlayerListItemAction,
    TeamPlayerListItemActions,
} from './interface';
import { getText, MapOfTextMeta, texts } from 'Components/Invite/List/ItemActions';


const TeamPlayersList = (props:IProps):JSX.Element => {
    const [loadings, setLoadings] = React.useState({});
    const [invited, setInvited] = React.useState<MapOfTextMeta>(parseInvitesToTextMeta());

    function parseInvitesToTextMeta():MapOfTextMeta {
        const check = props.actions && props.actions.some(action => [TeamPlayerListItemActions.accept, TeamPlayerListItemActions.reject].includes(action.type));
        return props.invites
            ? props.invites.reduce((acc, curr) => ((curr.state === InviteStatus.Pending && check) ? acc : { ...acc, [curr.invited_id]:texts[curr.state] }), {})
            : {};
    }

    async function onClick(key:string, handler:() => Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        return handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    function afterClickCreator(type:InviteStatus) {
        return function(playerID:number) {
            setInvited(prev => ({ ...prev, [playerID]:texts[type] }));
        }
    }

    // Action creators
    const buttons = {
        [TeamPlayerListItemActions.invite]: {
            key:        'invite',
            title:      'Пригласить',
            icon:       <PlusOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: afterClickCreator(InviteStatus.Pending)
        },
        [TeamPlayerListItemActions.accept]: {
            key:        'accept',
            title:      'Принять',
            icon:       <CheckCircleOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: afterClickCreator(InviteStatus.Accepted)
        },
        [TeamPlayerListItemActions.reject]: {
            key:        'reject',
            title:      'Отклонить',
            icon:       <MinusCircleOutlined/>,
            otherProps: { danger:true },
            afterClick: afterClickCreator(InviteStatus.Rejected)
        },
        [TeamPlayerListItemActions.remove]: {
            key:        'remove',
            title:      'Исключить',
            icon:       <MinusOutlined/>,
            otherProps: { danger:true },
            afterClick: null
        },
    };

    function getActionCreator(action:TeamPlayerListItemAction) {
        const d = buttons[action.type];
        return function actionCreator(player:User) {
            const dd = { ...d, key:d.key+player.id };
            return <Button
                {...dd.otherProps}
                loading={loadings[dd.key]}
                key={dd.key}
                icon={dd.icon}
                onClick={() => {
                    onClick(dd.key, action.handler.bind(null, player))
                        .then(() => dd.afterClick && dd.afterClick(player.id))
                }}
            >{dd.title}</Button>
        }
    }

    const actionCreators = props.actions
        ? props.actions.map(action => getActionCreator(action))
        : [];

    return (props.hideEmpty && !props.loading && props.players?.length === 0
        ? <></>
        : <List
            loading={props.loading}
            style={{ margin: 10 }}
            itemLayout="horizontal"
            dataSource={props.players}
            locale={{ emptyText:'Нет игроков' }}
            renderItem={player => (
                <List.Item
                    style={{ paddingLeft: 10 }}
                    className={'row'}
                    actions={invited[player.id]
                        ? [getText(invited[player.id])]
                        : actionCreators.map(ac => ac(player))
                    }
                >
                    <List.Item.Meta
                        avatar={(
                            <Link to={PATHS.profile.nickname(player.nickname)}>
                                <Avatar src={player.avatar.url}>{lettersForUserAvatar(player)}</Avatar>
                            </Link>
                        )}
                        title={<Link to={PATHS.profile.nickname(player.nickname)}>{`${player.name} ${player.surname}`}</Link>}
                        description={'@'+player.nickname}
                    />
                </List.Item>
            )}
        />
    );
}

export default TeamPlayersList;
