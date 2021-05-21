import * as React from 'react';

import { Button, List } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

import { User } from 'Utils/types';
import {
    IProps,
    TeamPlayerListItemAction,
    TeamPlayerListItemActions,
} from './interface';
import { userMeta } from 'Components/Invite/List/metas';


const TeamPlayersList = (props:IProps):JSX.Element => {
    const [loadings, setLoadings] = React.useState({});

    async function onClick(key:string, handler:() => Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        return handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    // Action creators
    const buttons = {
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
                    actions={actionCreators.map(ac => ac(player))}
                >
                    <List.Item.Meta {...userMeta(player)} />
                </List.Item>
            )}
        />
    );
}

export default TeamPlayersList;
