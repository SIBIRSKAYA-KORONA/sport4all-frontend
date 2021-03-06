import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import TournamentPageRender from './render';
import TournamentModel from 'Models/TournamentModel';
import {message} from 'antd';
import {connect} from 'react-redux';
import {URL_PARAMS} from 'Constants';
import {addRecentTour} from 'Store/Recent/RecentActions';
import store from 'Store/store';


function TournamentPage(props) {
    const tournamentId = Number(props.match.params[URL_PARAMS.tournament.id]);
    const [isLoading, setIsLoading] = useState(true);
    const [tournamentData, setTournamentData] = useState({})
    const [isOwner, setIsOwner] = useState(false);

    if (props.isAuthenticated) {
        const newIsOwner = props.user.id === tournamentData.ownerId;
        if (isOwner !== newIsOwner) {
            setIsOwner(newIsOwner);
        }
    }

    useEffect(async () => {
        let gotTournamentData;

        try {
            gotTournamentData = await TournamentModel.getTournament(tournamentId);
            const gotTeams = await TournamentModel.getTeams(tournamentId);
            const gotMatches = await TournamentModel.getMeetings(tournamentId);

            setTournamentData({...gotTournamentData, teams: gotTeams, matches: gotMatches});
            store.dispatch(addRecentTour(gotTournamentData));

        } catch (e) {
            console.error(e);
            message.error('Не удалось получить данные о турнире');
            return;
        }

        setIsLoading(false);

    }, [props.match.params[URL_PARAMS.tournament.id]])


    return (
        <TournamentPageRender
            {...props}
            isLoading={isLoading}
            isOwner={isOwner}
            tournamentData={tournamentData}
            setTournamentData={setTournamentData}
        />
    )
}


TournamentPage.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }).isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
});

export default connect(mapStateToProps)(TournamentPage);

