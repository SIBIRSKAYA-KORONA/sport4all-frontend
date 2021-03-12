import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import Footer from 'Components/Footer/render';

function TeamListPageRender(props) {
    return (
        <div className='page'>
            <div className="team-list">
                <h1>Все команды</h1>
                <table className='team-list__table'>
                    <thead><tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Вид спорта</th>
                    </tr></thead>
                    <tbody>
                        {props.teams.map(team =>
                            <tr key={team.title + team.description}>
                                <td>{team.title}</td>
                                <td>{team.description}</td>
                                <td>{team.sport}</td>
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
