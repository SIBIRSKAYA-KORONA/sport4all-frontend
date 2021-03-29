import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import TournamentPageRender from './render';
import TournamentModel from 'Models/TournamentModel';
import {message} from 'antd';

import UserModel from 'Models/UserModel';

function TournamentPage(props) {
    const tournamentId = Number(props.match.params.tournamentId);
    const [isLoading, setIsLoading] = useState(true);
    const [tournamentData, setTournamentData] = useState({})
    const [isOwner, setIsOwner] = useState(false);


    useEffect(async () => {
        let gotTournamentData;

        try {
            gotTournamentData = await TournamentModel.getTournament(tournamentId);
            const gotTeams = await TournamentModel.getTeams(tournamentId);
            const gotMatches = await TournamentModel.getMeetings(tournamentId);

            setTournamentData({...gotTournamentData, teams: gotTeams, matches: gotMatches});
        } catch (e) {
            console.error(e);
            message.error('Не удалось получить данные о турнире');
            return;
        }


        try {
            const userSettings = await UserModel.getProfile();
            setIsOwner(userSettings.id === gotTournamentData.ownerId);
        } catch (e) {
            console.error(e);
            setIsOwner(false);
        }

        setIsLoading(false);

    }, [])


    return (
        <TournamentPageRender
            history={props.history}
            isLoading={isLoading}
            isOwner={isOwner}
            tournamentData={tournamentData}
            setTournamentData={setTournamentData}
        />
    )
}


TournamentPage.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            tournamentId: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
}


export default TournamentPage;

