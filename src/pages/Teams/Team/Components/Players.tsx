import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Col, Avatar, Button, List, Divider, Input, message } from 'antd';

import { User } from 'Utils/types';
import TeamModel from 'Models/TeamModel';
import { lettersForAvatar } from 'Utils/utils';


interface IProps extends RouteComponentProps {
    players: Array<User>,
    canEdit: boolean,
    reload: () => void,
}

function TeamPlayers(props: IProps): JSX.Element {
    const teamId = props.match.params['id'];
    const [loadingPlayers, setLoadingPlayers] = React.useState(false);
    const [playersToAdd, setPlayersToAdd] = React.useState<Array<User>>([]);

    // Handlers
    const onPlayerDelete = (pid) => {
        if (!confirm('Уверены, что хотите исключить игрока из команды?')) return;
        TeamModel.instance.removePlayerFromTheTeam(teamId, pid)
            .then(() => props.reload())
            .catch(e => message.error(e));
    };

    const onPlayersSearch = (searchText) => {
        if (!searchText) return;
        TeamModel.instance.loadPlayersToAdd(teamId, searchText, 5)
            .then(players => setPlayersToAdd(players))
            .finally(() => setLoadingPlayers(false));
    };

    const onPlayerAdd = async (pid:number) => {
        return TeamModel.instance.addPlayerToTheTeam(teamId, pid)
            .then(() => setPlayersToAdd(playersToAdd.filter(player => player.id !== pid)))
            .then(() => props.reload())
            .catch(e => message.error(e));
    }

    // render
    return (
        <Col>
            <Divider orientation={'left'}>Игроки</Divider>

            <List
                itemLayout="horizontal"
                dataSource={props.players}
                renderItem={player => (
                    <List.Item
                        actions={[
                            <Button
                                danger
                                key={'delete' + player.id}
                                icon={<MinusOutlined/>}
                                onClick={() => onPlayerDelete(player.id)}
                            >
                                Исключить
                            </Button>
                        ]}>
                        <List.Item.Meta
                            avatar={<Avatar>{lettersForAvatar(player.name)}</Avatar>}
                            title={`${player.name} ${player.surname}`}
                            description={'@'+ player.nickname}
                        />
                    </List.Item>
                )}
            />

            <Divider orientation={'left'}>Добавить игроков</Divider>

            <Input.Search
                loading={loadingPlayers}
                placeholder={'Введите никнейм игрока'}
                onSearch={onPlayersSearch}/>

            <List
                itemLayout="horizontal"
                dataSource={playersToAdd}
                renderItem={player => (
                    <List.Item
                        actions={[
                            <Button
                                key={'add' + player.id}
                                type="primary"
                                icon={<PlusOutlined/>}
                                onClick={() => onPlayerAdd(player.id)}
                            >
                                Добавить
                            </Button>
                        ]}>
                        <List.Item.Meta
                            avatar={<Avatar>{lettersForAvatar(player.name)}</Avatar>}
                            title={`${player.name} ${player.surname}`}
                            description={'@'+ player.nickname}
                        />
                    </List.Item>
                )}
            />

        </Col>
    );
}

export default TeamPlayers;
