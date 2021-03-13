import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';
import { AutoComplete, Button } from 'antd';
const { Option } = AutoComplete;

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';
import BasePage from 'Components/BasePage/render';

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
            {props.team
                ? <>
                    <h1>{props.team.name}</h1>
                    <p>Описание - {props.team.about}</p>
                    <p>Местоположение - {props.team.location}</p>
                    <h3>Игроки</h3>
                    {props.team.players.map(player => <p key={player.id}>{player.name} {player.surname} {player.nickname}</p>)}
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
                </>
                : <p>404</p>
            }
            <></>
        </BasePage>
        <Footer/>
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
