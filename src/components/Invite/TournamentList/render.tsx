import * as React from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Button, List } from 'antd';
import { ButtonType } from 'antd/lib/button';
import {
    CheckCircleOutlined,
    MinusCircleOutlined, PlusCircleOutlined,
} from '@ant-design/icons';

import CONST from 'Constants';
import { Tournament } from 'Utils/types';
import { InviteStatus } from 'Utils/enums';
import { lettersForAvatar } from 'Utils/utils';
import { getText, MapOfTextMeta, texts } from 'Components/Invite/List/ItemActions';
import { IProps, TournamentInviteListItemAction, TournamentInviteListItemActions } from './interface';


const TournamentInviteList = (props:IProps):JSX.Element => {
    const [loadings, setLoadings] = React.useState({});
    const [invited, setInvited] = React.useState<MapOfTextMeta>(parseInvitesToTextMeta());

    function parseInvitesToTextMeta():MapOfTextMeta {
        const check = props.actions && props.actions.some(action => [TournamentInviteListItemActions.accept, TournamentInviteListItemActions.reject].includes(action.type));
        return props.invites
            ? props.invites.reduce((acc, curr) => ((curr.state === InviteStatus.Pending && check) ? acc : { ...acc, [curr.tournament_id]:texts[curr.state] }), {})
            : {};
    }

    async function onClick(key:string, handler:() => Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        return handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    function afterClickCreator(type:InviteStatus) {
        return function(tournamentID:number) {
            setInvited(prev => ({ ...prev, [tournamentID]:texts[type] }));
        }
    }

    // Action creators
    const buttons = {
        [TournamentInviteListItemActions.accept]: {
            key:        'accept',
            title:      'Принять',
            icon:       <CheckCircleOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: afterClickCreator(InviteStatus.Accepted)
        },
        [TournamentInviteListItemActions.reject]: {
            key:        'reject',
            title:      'Отклонить',
            icon:       <MinusCircleOutlined/>,
            otherProps: { danger:true },
            afterClick: afterClickCreator(InviteStatus.Rejected)
        },
        [TournamentInviteListItemActions.sendInvite]: {
            key:        'sendInvite',
            title:      'Выслать приглашение',
            icon:       <PlusCircleOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: afterClickCreator(InviteStatus.Pending)
        },
    };

    function getActionCreator(action:TournamentInviteListItemAction) {
        const d = buttons[action.type];
        return function actionCreator(tournament:Tournament) {
            const dd = { ...d, key:d.key+tournament.id };
            return <Button
                {...dd.otherProps}
                loading={loadings[dd.key]}
                key={dd.key}
                icon={dd.icon}
                onClick={() => {
                    onClick(dd.key, action.handler.bind(null, tournament))
                        .then(() => dd.afterClick && dd.afterClick(tournament.id))
                }}
            >{dd.title}</Button>
        }
    }

    const actionCreators = props.actions
        ? props.actions.map(action => getActionCreator(action))
        : [];

    return (props.hideEmpty && !props.loading && props.tournaments?.length === 0
        ? <></>
        : <List
            loading={props.loading}
            style={{ margin: 10 }}
            itemLayout="horizontal"
            dataSource={props.tournaments}
            locale={{ emptyText:'Нет приглашений' }}
            renderItem={tournament => (
                <List.Item
                    style={{ paddingLeft: 10 }}
                    className={'row'}
                    actions={invited[tournament.id]
                        ? [getText(invited[tournament.id])]
                        : actionCreators.map(ac => ac(tournament))
                    }
                >
                    <List.Item.Meta
                        avatar={(
                            <Link to={CONST.PATHS.tournaments.id(tournament.id)}>
                                <Avatar src={tournament.avatar.url}>{lettersForAvatar(tournament.name)}</Avatar>
                            </Link>
                        )}
                        title={<Link to={CONST.PATHS.tournaments.id(tournament.id)}>{tournament.name}</Link>}
                        description={tournament.about}
                    />
                </List.Item>
            )}
        />
    );
}

export default TournamentInviteList;
