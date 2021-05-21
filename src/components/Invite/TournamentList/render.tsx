import * as React from 'react';

import { Button, List } from 'antd';

import { Tournament } from 'Utils/types';
import { tournamentMeta } from 'Components/Invite/List/metas';
import { IProps, TournamentInviteListItemAction } from './interface';


const TournamentInviteList = (props:IProps):JSX.Element => {
    const [loadings, setLoadings] = React.useState({});

    async function onClick(key:string, handler:() => Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        return handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    // Action creators
    const buttons = {};

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
                    actions={actionCreators.map(ac => ac(tournament))}
                >
                    <List.Item.Meta {...tournamentMeta(tournament)} />
                </List.Item>
            )}
        />
    );
}

export default TournamentInviteList;
