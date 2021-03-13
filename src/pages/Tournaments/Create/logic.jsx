import * as React from 'react';

import TournamentCreatePageRender from './render';

class TournamentCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tournamentName: '',
            sportType: '',
            tournamentSystem: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     *
     * @param {Object} tournamentData - object with tournament data
     * @param {String} tournamentData.tournamentName - Name of the tournament
     * @param {String} tournamentData.sportType - Type of sport
     * @param {String} tournamentData.tournamentSystem - Tournament system
     */
    handleSubmit(tournamentData) {
        console.log(tournamentData);
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
