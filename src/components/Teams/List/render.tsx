import './style.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Avatar, List, Button } from 'antd';

import CONST from 'Constants';
import { lettersForAvatar } from 'Utils/utils';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { IProps, TeamListItemAction } from 'Components/Teams/List/interface';


const TeamList = (props:IProps):JSX.Element => {
    const [loadings, setLoadings] = React.useState({});

    function onClick(key:string, handler:()=>Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    let actionCreator;
    if (props.action) {
        switch (props.action.type) {
        case TeamListItemAction.add:
            actionCreator = function action(teamID:number) {
                const key = 'add'+teamID;
                return (<Button
                    type='primary'
                    loading={loadings[key]}
                    key={key}
                    icon={<PlusOutlined/>}
                    onClick={() => onClick(key, props.action.handler.bind(null, teamID))}
                >Добавить</Button>)
            }
            break
        case TeamListItemAction.delete:
            actionCreator = function action(teamID:number) {
                const key = 'delete'+teamID;
                return (<Button
                    danger
                    loading={loadings[key]}
                    key={key}
                    icon={<MinusOutlined/>}
                    onClick={() => onClick(key, props.action.handler.bind(null, teamID))}
                >Удалить</Button>)
            }
            break;
        }
    }

    return (
        <List
            loading={props.loading}
            style={{ margin: 10 }}
            itemLayout="horizontal"
            dataSource={props.teams}
            locale={{ emptyText:'Нет команд' }}
            renderItem={team => (
                <List.Item
                    style={{ paddingLeft: 10 }}
                    className={'row'}
                    actions={actionCreator ? [actionCreator(team.id)] : []}
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
