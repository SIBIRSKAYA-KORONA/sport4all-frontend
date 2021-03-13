import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import TeamListPageRender from './render';
import { createTeam, loadTeams } from 'Actions/Team/TeamActions';
import TeamModel from 'Models/TeamModel';

class TeamListPage extends React.Component {
    constructor(props) {
        super(props);
        this.load();

        this.onTeamClick = this.onTeamClick.bind(this);
    }

    load() {
        TeamModel.instance.loadTeams('owner').then(teams => {
            this.props.loadTeams(teams);
        });
    }

    onTeamClick(e) {
        const id = e.currentTarget.getAttribute('data-id');
        if (!id) return;
        this.props.history.push(`/teams/${id}`);
    }

    render = () => (<TeamListPageRender teams={this.props.teams} onTeamClick={this.onTeamClick}/>);
}

TeamListPage.propTypes = {
    teams: propTypes.array.isRequired,
    createTeam: propTypes.func.isRequired,
    loadTeams: propTypes.func.isRequired,
    history: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
    teams: state.teams
});

export default connect(mapStateToProps, { createTeam, loadTeams })(TeamListPage);
