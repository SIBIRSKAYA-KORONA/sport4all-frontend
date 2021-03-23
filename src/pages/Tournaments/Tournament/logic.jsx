import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import TournamentPageRender from './render';
import TournamentModel from 'Models/TournamentModel';
// import UserModel from 'Models/UserModel';

function TournamentPage(props) {
    const tournamentId = Number(props.match.params.tournamentId);
    const [isLoading, setIsLoading] = useState(true);
    const [tournamentData, setTournamentData] = useState({})


    useEffect(async () => {
        // TODO: check if owner
        // const userSettings = await UserModel.instance.getProfile();

        const gotTournamentData = await TournamentModel.instance.getTournament(tournamentId);
        const gotTeams = await TournamentModel.instance.getTeams(tournamentId);
        const gotMatches = await TournamentModel.instance.getMatches(tournamentId);

        setTournamentData({...gotTournamentData, teams: gotTeams, matches: gotMatches});
        setIsLoading(false)
    }, [])



    return (
        <TournamentPageRender
            isLoading={isLoading}
            isOwner={true}
            tournamentData={tournamentData}
            setTournamentData={setTournamentData}
        />
    )
}


TournamentPage.propTypes = {
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            tournamentId: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
}


export default TournamentPage;

