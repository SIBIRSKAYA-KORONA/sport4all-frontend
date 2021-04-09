import * as React from 'react';
import PropTypes from 'prop-types'
import TournamentModel from 'Models/TournamentModel';
import PublicInfoRender from 'Pages/Tournaments/Tournament/sections/Settings/PublicInfo/render';
import {message} from 'antd';

function PublicInfoLogic(props) {
    const updatePublicInfo = async (newInfo) => {
        const payload = {
            'location': newInfo.location,
            'name': newInfo.name,
            'about': newInfo.about,
            'system': newInfo.systemType,
            'status': newInfo.status,
            'sport': newInfo.sport,
        }

        try {
            await TournamentModel.updateTournament(props.tournamentData.id, payload);
            message.success('Информация о турнире обновлена');
        } catch (e) {
            console.error(e);
            message.error('Не удалось обновить информацию о турнире');
            return;
        }

        try {
            const updatedData = await TournamentModel.getTournament(props.tournamentData.id);
            props.setTournamentData({...props.tournamentData, ...updatedData});
        } catch (e) {
            console.error(e);
            message.error('Не удалось получить информацию о турнире');
        }

    }

    const onAvatarChanged = async(fileData) => {
        const formData = new FormData();
        formData.append('tournamentId', props.tournamentData.id);
        formData.append('attach', fileData.file);
        const response = await (await fetch('https://sport4all.tech/api/attachments', {
            method: 'POST',
            body: formData,
            mode: 'cors',
            credentials: 'include'
        })).json();

        props.setTournamentData({...props.tournamentData, avatar: response})
    }

    return (
        <PublicInfoRender
            tournamentData={props.tournamentData}
            onSubmit={updatePublicInfo}
            onAvatarChanged={onAvatarChanged}
        />
    )
}

PublicInfoLogic.propTypes = {
    tournamentData: PropTypes.object.isRequired,
    setTournamentData: PropTypes.func.isRequired,
}

export default PublicInfoLogic;
