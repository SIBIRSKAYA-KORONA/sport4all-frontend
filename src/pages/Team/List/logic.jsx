import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import TeamListPageRender from './render';
import { createTeam, loadTeams } from 'Actions/Team/TeamActions';
import TeamModel from 'Models/TeamModel';

class TeamListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.load();
    }

    load() {
        TeamModel.instance.loadTeams().then(teams => {
            this.props.loadTeams(teams);
        });
    }

    render() {
        return (
            <TeamListPageRender teams={this.props.teams}/>
        )
    }
}

TeamListPage.propTypes = {
    teams: propTypes.array.isRequired,
    createTeam: propTypes.func.isRequired,
    loadTeams: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
    teams: state.teams
});

export default connect(mapStateToProps, { createTeam, loadTeams })(TeamListPage);
