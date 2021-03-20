import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import { AutoComplete, Button, Space, Spin, Table, Typography } from 'antd';
const { Option } = AutoComplete;
const { Title, Text } = Typography;

import BasePage from 'Components/BasePage/render';


const TeamPageRender = (props) => {
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
            .finally(() => {
                setLoadings(prev => ({...prev, [pid]: false}))
            });
    };

    // For table
    let columns = [
        {title: 'Имя', dataIndex: 'name', key: 'name'},
        {title: 'Фамилия', dataIndex: 'surname', key: 'surname'},
        {title: 'Никнейм', dataIndex: 'nickname', key: 'nickname'}
    ];
    if (props.canEdit)
        columns.push({
            title: '',
            key: 'delete',
            render: function LinkCell(text, player) {
                return (
                    <Button
                        size='middle'
                        type='danger'
                        loading={loadings[player.id]}
                        onClick={onPlayerDelete.bind(this, player.id)}
                    >Исключить</Button>
                )
            },
        });
    return (
        <BasePage>
            {props.loading && <Spin/>}
            {props.team && <Space direction='vertical' size='large'>
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

TeamPageRender.propTypes = {
    loading: propTypes.bool.isRequired,
    canEdit: propTypes.bool.isRequired,
    onDelete: propTypes.func.isRequired,
    team: propTypes.object,
    playersToAdd: propTypes.arrayOf(propTypes.object).isRequired,
    loadPlayers: propTypes.func.isRequired,
    selectPlayer: propTypes.func.isRequired,
    selectedPlayer: propTypes.object,
    addPlayer: propTypes.func.isRequired,
};

export default TeamPageRender;
