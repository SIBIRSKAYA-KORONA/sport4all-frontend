import * as React from 'react';
import PropTypes from 'prop-types'

import TournamentCreatePageRender from './render';
import TournamentModel from 'Models/TournamentModel';
import {message} from 'antd';
import {PATHS} from 'Constants';

class TournamentCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     *
     * @param {Object} tournamentData - object with tournament data
     * @param {String} tournamentData.name - Name of the tournament
     * @param {String} [tournamentData.about] - Tournament description
     * @param {String} [tournamentData.sport] - Type of sport
     * @param {String} [tournamentData.systemType] - Tournament system type
     * @param {String} [tournamentData.location] - Tournament location
     */
    handleSubmit(tournamentData) {
        // TODO: pass location
        const payload = {
            'location': tournamentData.location,
            'name': tournamentData.name,
            'about': tournamentData.about,
            'system': tournamentData.systemType,
            'sport': tournamentData.sport
        }

        TournamentModel.createTournament(payload)
            .then(response => {
                this.props.history.push(PATHS.tournaments.id(response.id));
            })
            .catch(() => { message.error('Не удалось создать турнир'); })
    }

    render() {
        return (
            <TournamentCreatePageRender
                onSubmit={this.handleSubmit}
            />
        )
    }
}

TournamentCreatePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default TournamentCreatePage;
