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

    const updateTeams = async () => {
        try {
            const teams = await TournamentModel.instance.getTeams(props.tournamentData.id);
            props.setTournamentData({...props.tournamentData, teams: teams});
        } catch (e) {
            console.error(e);
            message.error('Не удалось обновить информацию о турнире');
        }
    }

    const addTeam = async (teamId) => {
        try {
            await TournamentModel.instance.addTeam(props.tournamentData.id, teamId);
        } catch (e) {
            console.error(e);
            message.error('Не удалось добавить команду');
            return;
        }

        await updateTeams();
    }

    const deleteTeam = async (teamId) => {
        try {
            await TournamentModel.instance.removeTeam(props.tournamentData.id, teamId);
        } catch (e) {
            console.error(e);
            message.error('Не удалось убрать команду');
            return;
        }

        await updateTeams();
    }

    const searchTeams = async (teamName) => {
        if (!teamName) {
            return;
        }

        setIsSearching(true);
        try {
            // TODO: remove limit, add pagination or something idk
            const limit = 100;
            const gotTeams = await TeamModel.instance.searchTeams(teamName, limit);
            const currentTeamIds = props.tournamentData.teams.map((team) => team.id);
            const teamsForAdding = [];
            for (const team of gotTeams) {
                if (!currentTeamIds.includes(team.id)) {
                    teamsForAdding.push(team);
                }
            }

            setSearchResults(teamsForAdding);
        } catch (e) {
            console.error(e);
            message.error('Не удалось осуществить поиск');
        } finally {
            setIsSearching(false);
        }
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
