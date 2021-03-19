import * as React from 'react';
import PropTypes from 'prop-types'
import TournamentPageRender from './render';
import TournamentModel from 'Models/TournamentModel';
import {useEffect, useState} from 'react';

function TournamentPage(props) {
    const tournamentId = Number(props.match.params.tournamentId);
    const [tournamentData, setTournamentData] = useState(undefined);

    useEffect(async () => {
        const gotTournamentData = await TournamentModel.instance.getTournament(tournamentId);
        const gotTeams = await TournamentModel.instance.getTeams(tournamentId);
        setTournamentData({...gotTournamentData, teams: gotTeams});
    }, [])


    return (
        <TournamentPageRender tournamentData={tournamentData}/>
    )
}


TournamentPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tournamentId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
}

export default TournamentPage;
