import * as React from 'react';
import propTypes from 'prop-types';

import TeamListPageRender from './render';
import TeamModel from 'Models/TeamModel';

class TeamListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }

        this.onTeamClick = this.onTeamClick.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        TeamModel.instance.loadTeams('owner').then(teams => {
            this.setState({ teams:teams });
        });
    }

    onTeamClick(e) {
        const id = e.currentTarget.getAttribute('data-id');
        if (!id) return;
        this.props.history.push(`/teams/${id}`);
    }

    render = () => (<TeamListPageRender teams={this.state.teams} onTeamClick={this.onTeamClick}/>);
}

TeamListPage.propTypes = {
    history: propTypes.object.isRequired,
};

export default TeamListPage;
