import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';
import {AutoComplete, Button, Table} from 'antd';

import Header from 'Components/Header/render';
import BasePage from 'Components/BasePage/render';

const { Option } = AutoComplete;

const TeamPageRender = (props) => {
    const [value, setValue] = React.useState('');
    const onClick = async () => {
        if (await props.addPlayer()) setValue('');
    };
    const onChange = (data) => {
        setValue(data);
    };
    return (<>
        <Header/>
        <BasePage>
            {props.team && <>
                <h1>{props.team.name}</h1>
                <p>Описание - {props.team.about}</p>
                <p>Местоположение - {props.team.location}</p>
                {props.team.players.length && <>
                    <h3>Игроки</h3>
                    <Table
                        dataSource={props.team.players.map(player => { player.key = player.id; return player; })}
                        columns={[
                            { title: 'Имя', dataIndex: 'name', key:'name' },
                            { title: 'Фамилия', dataIndex: 'surname', key:'surname' },
                            { title: 'Никнейм', dataIndex: 'nickname', key:'nickname' }
                        ]}/>
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
        </BasePage>
    </>)
}

TeamPageRender.propTypes = {
    team: propTypes.object,
    playersToAdd: propTypes.arrayOf(propTypes.object).isRequired,
    loadPlayers: propTypes.func.isRequired,
    selectPlayer: propTypes.func.isRequired,
    selectedPlayer: propTypes.object,
    addPlayer: propTypes.func.isRequired,
};

export default TeamPageRender;
