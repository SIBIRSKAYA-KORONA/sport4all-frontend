import * as React from 'react';
import PropTypes from 'prop-types'
import TournamentModel from 'Models/TournamentModel';
import TeamModel from 'Models/TeamModel';
import ParticipantsRender from 'Pages/Tournaments/Tournament/sections/Settings/Participants/render';
import {useState} from 'react';
import {message} from 'antd'

function ParticipantsLogic(props) {
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const addTeam = async (teamId) => {
        await TournamentModel.instance.addTeam(props.tournamentData.id, teamId);
        message.success('Команда успешно добавлена')
    }

    const deleteTeam = async (teamId) => {
        // TODO: get api result
        // await TournamentModel.instance.removeTeam(props.tournamentData.id, teamId)
        console.log('TODO: Delete team', teamId);
    }

    const searchTeams = async (teamName) => {
        if (!teamName) {
            message.error('Введите название команды');
            return;
        }

        setIsSearching(true);
        const gotTeams = await TeamModel.instance.searchTeams(teamName, 100);
        setIsSearching(false);

        const currentTeamIds = props.tournamentData.teams.map((team) => team.id);
        const teamsForAdding = [];
        for (const team of gotTeams) {
            if (!currentTeamIds.includes(team.id)) {
                teamsForAdding.push(team);
            }
        }

        setSearchResults(teamsForAdding);
    }

    return (
        <ParticipantsRender
            teams={props.tournamentData.teams}
            isSearching={isSearching}
            searchResults={searchResults}
            onTeamAdd={addTeam}
            onTeamDelete={deleteTeam}
            onSearchTeams={searchTeams}
        />
    )
}

ParticipantsLogic.propTypes = {
    tournamentData: PropTypes.object.isRequired,
    setTournamentData: PropTypes.func.isRequired,
}

export default ParticipantsLogic;
