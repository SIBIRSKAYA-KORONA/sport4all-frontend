import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import TournamentPageRender from './render';
import TournamentModel from 'Models/TournamentModel';


function TournamentPage(props) {
    const tournamentId = Number(props.match.params.tournamentId);
    const [tournamentData, setTournamentData] = useState(undefined);

    useEffect(async () => {
        const gotTournamentData = await TournamentModel.instance.getTournament(tournamentId);
        const gotTeams = await TournamentModel.instance.getTeams(tournamentId);
        console.log(gotTeams)
        setTournamentData({...gotTournamentData, teams: gotTeams});
    }, [])


    let section = TournamentPageRender.sections[0];
    const urlSection = props.history.location?.state?.section;
    if (TournamentPageRender.sections.includes(urlSection)) {
        section = urlSection;
    }

    const onSectionChange = (newSection) => {
        props.history.replace(props.history.location.pathname, {section: newSection})
    }

    return (
        <TournamentPageRender
            tournamentData={tournamentData}
            section={section}
            onSectionChange={onSectionChange}
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
