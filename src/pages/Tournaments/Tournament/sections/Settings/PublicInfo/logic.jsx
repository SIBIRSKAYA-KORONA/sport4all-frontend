import * as React from 'react';
import PropTypes from 'prop-types'
import TournamentModel from 'Models/TournamentModel';
import PublicInfoRender from 'Pages/Tournaments/Tournament/sections/Settings/PublicInfo/render';

function PublicInfoLogic(props) {
    const updatePublicInfo = async (newInfo) => {
        const payload = {
            'location': newInfo.location,
            'name': newInfo.name,
            'about': newInfo.about,
            'system': newInfo.systemType,
        }

        await TournamentModel.instance.updateTournament(props.tournamentData.id, payload)
    }

    return (
        <PublicInfoRender
            tournamentData={props.tournamentData}
            onSubmit={updatePublicInfo}
        />
    )
}

PublicInfoLogic.propTypes = {
    tournamentData: PropTypes.object.isRequired,
    setTournamentData: PropTypes.func.isRequired,
}

export default PublicInfoLogic;
