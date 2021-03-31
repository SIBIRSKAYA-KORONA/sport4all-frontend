import './style.scss';
import * as React from 'react';

import { AutoComplete, Button, Space, Table, Typography } from 'antd';
const { Option } = AutoComplete;
const { Title, Text } = Typography;

import { Team, User } from 'Utils/types';
import BasePage from 'Components/BasePage/render';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
    loading: boolean,
    canEdit: boolean,
    onDelete: (pid:number) => Promise<void>,
    team: Team | null,
    playersToAdd: Array<User>,
    loadPlayers: (text:string) => void,
    selectPlayer: (data:any, option:any) => void,
    selectedPlayer: User | null,
    addPlayer: () => Promise<boolean>,
}


const TeamPageRender = (props: IProps):JSX.Element => {
    const [value, setValue] = React.useState('');
    const [loadings, setLoadings] = React.useState({});
    const onClick = async () => {
        if (await props.addPlayer()) setValue('');
    };
    const onChange = (data) => {
        setValue(data)
    };
    const onPlayerDelete = (pid) => {
        if (!pid || loadings[pid]) return;
        if (!confirm('Уверены, что хотите исключить игрока из команды?')) return;
        setLoadings(prev => ({...prev, [pid]: true}));
        props.onDelete(pid)
            .catch(e => alert.bind(this, e.message))
            .finally(() => setLoadings(prev => ({...prev, [pid]: false})));
    };

    // For table
    const columns: any[] = [
        {title: 'Имя', dataIndex: 'name', key: 'name'},
        {title: 'Фамилия', dataIndex: 'surname', key: 'surname'},
        {title: 'Никнейм', dataIndex: 'nickname', key: 'nickname'}
    ];
    if (props.canEdit)
        columns.push({
            title: '',
            key: 'delete',
            render: function LinkCell(text, player) {
                return (<Button
                    size='middle'
                    loading={loadings[player.id]}
                    onClick={onPlayerDelete.bind(this, player.id)}
                >Исключить</Button>)
            },
        });

    return (
        <BasePage {...props} loading={props.loading}>{props.team &&
            <Space direction='vertical' size='large'>
                <Space direction='vertical' size='middle'>
                    <Title level={2}>{props.team.name}</Title>
                    <Text>Описание - {props.team.about}</Text>
                    <Text>Местоположение - {props.team.location}</Text>
                </Space>
                {props.team.players.length && <Space size='middle' direction='vertical'>
                    <Title level={3}>Игроки</Title>
                    <Table
                        dataSource={props.team.players.map(player => ({...player, key: player.id}))}
                        columns={columns}
                        pagination={false}
                    />
                </Space>}
                <Space direction='vertical' size='small'>
                    <Title level={4}>Добавить игрока</Title>
                    <Space direction='horizontal' size='small'>
                        <AutoComplete
                            style={{width: 200}}
                            placeholder='Введите имя'
                            onSearch={props.loadPlayers}
                            onSelect={props.selectPlayer}
                            value={value}
                            onChange={onChange}
                        >
                            {props.playersToAdd.map(player =>
                                <Option key={player.id} data-id={player.id} value={player.nickname}>{player.nickname}</Option>
                            )}
                        </AutoComplete>
                        <Button onClick={onClick} type='primary' disabled={!props.selectedPlayer}>Добавить</Button>
                    </Space>
                </Space>
            </Space>}
        </BasePage>
    )
}

export default TeamPageRender;
