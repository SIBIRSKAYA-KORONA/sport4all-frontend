import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import TeamPageRender from './render';
import { createTeam } from 'Actions/Team/TeamActions';
import TeamModel from 'Models/TeamModel';

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: null,
            playersToAdd: [],
            selectedPlayer: null,
        };

        this.load(this.props.match.params.id);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadPlayers = this.loadPlayers.bind(this);
        this.selectPlayer = this.selectPlayer.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
    }

    load(tid) {
        TeamModel.instance.loadTeam(tid)
            .then(team => this.setState(prevState => ({
                ...prevState,
                team: team
            })))
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

    render = () => (
        <TeamPageRender
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
    createTeam: propTypes.func.isRequired,
    history: propTypes.object.isRequired,
    match: propTypes.object.isRequired,
};

export default connect(null, { createTeam })(TeamPage);
