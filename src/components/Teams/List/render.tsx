import * as React from 'react';
import './style.scss';

import TeamModel from 'Models/TeamModel';

import { Team } from 'Utils/types';
import { Spin } from 'antd';
import {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

const initTeams: [Team?] = [];

const TeamList = (props:RouteComponentProps):JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState(initTeams);

    useEffect(() => {
        const load = () => {
            TeamModel.instance.loadTeams('owner').then(teams => {
                setTeams(teams);
                setLoading(false);
            });
        }
        load();
    }, []);

    return (
        <div className="team-list">
            <h1>Все команды</h1>
            {loading
                ? <><Spin/></>
                : <table className='team-list__table'>
                    <thead><tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Место</th>
                        <th>owner_id</th>
                        <th>ID</th>
                    </tr></thead>
                    <tbody>
                        {teams.map(team =>
                            <tr key={team.id} data-id={team.id} onClick={() => {props.history.push('/teams/'+team.id)}}>
                                <td>{team.name}</td>
                                <td>{team.about}</td>
                                <td>{team.location}</td>
                                <td>{team.ownerId}</td>
                                <td>{team.id}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </div>
    )
};

export default TeamList;
