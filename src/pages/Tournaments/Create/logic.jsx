import * as React from 'react';

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
     * @param {String} tournamentData.tournamentName - Name of the tournament
     * @param {String} tournamentData.sportType - Type of sport
     * @param {String} [tournamentData.tournamentSystem] - Tournament system
     */
    handleSubmit(tournamentData) {
        // TODO: pass location
        const payload = {
            'location': 'Moscow',
            'name': tournamentData.tournamentName
        }

        TournamentModel.instance.createTournament(payload)
            .then(response => { console.log(response); })
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


export default TournamentCreatePage;
