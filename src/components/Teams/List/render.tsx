import './style.scss';
import * as React from 'react';

import { Button, List } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

import { Team } from 'Utils/types';
import { teamMeta } from 'Components/Invite/List/metas';
import { IProps, TeamListItemAction, TeamListItemActions } from 'Components/Teams/List/interface';


const TeamList = (props:IProps):JSX.Element => {
    const [loadings, setLoadings] = React.useState({});

    async function onClick(key:string, handler:() => Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    const buttons = {
        [TeamListItemActions.delete]: {
            key:        'delete',
            title:      'Удалить',
            icon:       <MinusOutlined/>,
            otherProps: { danger:true },
            afterClick: null
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
                onClick={() => onClick(dd.key, action.handler.bind(null, team))}
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
                    actions={actionCreators.map(ac => ac(team))}
                >
                    <List.Item.Meta {...teamMeta(team)}/>
                </List.Item>
            )}
        />
    );
}

export default TeamList;
