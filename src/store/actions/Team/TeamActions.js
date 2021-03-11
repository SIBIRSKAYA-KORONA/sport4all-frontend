import * as types from 'Actions/Team/TeamActionTypes'

export const createTeam = (team) => ({ type: types.CREATE_TEAM, team });
export const loadTeams = (teams) => ({ type: types.LOAD_TEAMS, teams });
