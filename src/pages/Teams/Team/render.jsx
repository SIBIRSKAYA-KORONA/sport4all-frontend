import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import { AutoComplete, Button, Table } from 'antd';
const { Option } = AutoComplete;

import BasePage from 'Components/BasePage/render';


const TeamPageRender = (props) => {
    const [value, setValue] = React.useState('');
    const [loadings, setLoadings] = React.useState({});
    const onClick = async () => {
        if (await props.addPlayer()) setValue('');
    };
    const onChange = (data) => { setValue(data) };
    const onPlayerDelete = (pid) => {
        if (!pid || loadings[pid]) return;
        if (!confirm('Уверены, что хотите исключить игрока из команды?')) return;
        setLoadings(prev => ({ ...prev, [pid]:true }));
        props.onDelete(pid)
            .catch(e => alert.bind(this, e.message))
            .finally(() => { setLoadings(prev => ({ ...prev, [pid]:false })) });
    };

    // For table
    let columns = [
        { title: 'Имя', dataIndex: 'name', key:'name' },
        { title: 'Фамилия', dataIndex: 'surname', key:'surname' },
        { title: 'Никнейм', dataIndex: 'nickname', key:'nickname' }
    ];
    if (props.canEdit)
        columns.push({
            title: '',
            key: 'delete',
            render: function LinkCell(text, player) { return (
                <Button
                    size='middle'
                    type='danger'
                    loading={loadings[player.id]}
                    onClick={onPlayerDelete.bind(this, player.id)}
                >Исключить</Button>
            )},
        });
    return (
        <BasePage>
            {props.team && <>
                <h1>{props.team.name}</h1>
                <p>Описание - {props.team.about}</p>
                <p>Местоположение - {props.team.location}</p>
                {props.team.players.length && <>
                    <h3>Игроки</h3>
                    <Table
                        dataSource={props.team.players.map(player => ({ ...player, key: player.id }))}
                        columns={columns}
                        pagination={false}
                    />
                </>}
                <h3>Добавить игрока</h3>
                <AutoComplete
                    style={{ width: 200 }}
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
            </>}
            <></>
        </BasePage>)
}

TeamPageRender.propTypes = {
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
