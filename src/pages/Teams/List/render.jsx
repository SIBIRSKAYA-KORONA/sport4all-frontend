import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';

function TeamListPageRender(props) {
    return (
        <div className='page'>
            <Header/>
            <div className="team-list">
                <h1>Все команды</h1>
                <table className='team-list__table'>
                    <thead><tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Место</th>
                        <th>owner_id</th>
                        <th>ID</th>
                    </tr></thead>
                    <tbody>
                        {props.teams.map(team =>
                            <tr key={team.name + team.description}>
                                <td>{team.name}</td>
                                <td>{team.about}</td>
                                <td>{team.location}</td>
                                <td>{team.owner_id}</td>
                                <td>{team.id}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

TeamListPageRender.propTypes = {
    teams: propTypes.array.isRequired,
};

export default TeamListPageRender;
