import * as React from 'react';
import propTypes from 'prop-types';

import TeamPageRender from './render';
import TeamModel from 'Models/TeamModel';
import UserModel from 'Models/UserModel';

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: null,
            playersToAdd: [],
            selectedPlayer: null,
            canEdit: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadPlayers = this.loadPlayers.bind(this);
        this.selectPlayer = this.selectPlayer.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.onPlayerDelete = this.onPlayerDelete.bind(this);
    }

    componentDidMount() {
        this.load(this.props.match.params.id)
    }

    async load(tid) {
        return TeamModel.instance.loadTeam(tid)
            .then(team => {
                if (!team.players) team.players = [];
                this.setState(prevState => ({
                    ...prevState,
                    team: team
                }))
            })
    }

    handleSubmit(values) {
        if (!values.name) return;
        TeamModel.instance.createTeam(values)
            .then(response => { console.log(response); })
            .catch(error => { console.error(error); })
    }

    loadPlayers(searchText) {
        if (!searchText) return;
        TeamModel.instance.loadPlayersToAdd(this.state.team.id, searchText, 5)
            .then(players => {
                this.setState(prevState => ({
                    ...prevState,
                    playersToAdd: players
                }))
            })
    }

    selectPlayer(data, option) {
        const id = option['data-id'];
        const player = this.state.playersToAdd.find(player => player.id === id);
        console.log(player);
        this.setState(prevState => ({
            ...prevState,
            selectedPlayer: player
        }));
    }

    async addPlayer() {
        if (!this.state.selectedPlayer) return false;
        return TeamModel.instance.addPlayerToTheTeam(this.state.team.id, this.state.selectedPlayer.id)
            .then(() => {
                this.setState(prevState => ({
                    ...prevState,
                    selectedPlayer: null,
                    playersToAdd: [],
                }));
                this.load(this.state.team.id);
                return true;
            })
            .catch(error => {
                console.error(error);
                return false;
            });
    }

    async onPlayerDelete(pid) {
        if (!this.state.team || !pid) return;
        return TeamModel.instance.removePlayerFromTheTeam(this.state.team.id, pid)
            .then(() => {
                this.setState(prev => ({
                    ...prev,
                    team: {
                        ...prev.team,
                        players: prev.team.players.filter(player => player.id !== pid)
                    }
                }))
            })
            .catch(e => { throw e });
    }

    render = () => (
        <TeamPageRender
            canEdit={this.state.canEdit}
            onDelete={this.onPlayerDelete}
            onSubmit={this.handleSubmit}
            loadPlayers={this.loadPlayers}
            team={this.state.team}
            playersToAdd={this.state.playersToAdd}
            addPlayer={this.addPlayer}
            selectPlayer={this.selectPlayer}
            selectedPlayer={this.state.selectedPlayer}/>
    );
}

TeamPage.propTypes = {
    history: propTypes.object.isRequired,
    match: propTypes.object.isRequired,
};

export default TeamPage;
