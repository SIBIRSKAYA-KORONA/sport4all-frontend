import * as React from 'react';
import PropTypes from 'prop-types'

import TournamentCreatePageRender from './render';
import TournamentModel from 'Models/TournamentModel';

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
     * @param {String} [tournamentData.sportType] - Type of sport
     * @param {String} [tournamentData.systemType] - Tournament system type
     */
    handleSubmit(tournamentData) {
        // TODO: pass location
        const payload = {
            'location': 'Moscow',
            'name': tournamentData.name,
            'about': tournamentData.about,
            'system': 1,
        }

        TournamentModel.instance.createTournament(payload)
            .then(response => {
                console.log(response);
                this.props.history.push(`/tournaments/${response.id}`);
            })
            .catch(error => { console.error(error); })
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
