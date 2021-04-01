import * as React from 'react';
import propTypes from 'prop-types';

import TeamPageRender from './render.tsx';
import TeamModel from 'Models/TeamModel';
import UserModel from 'Models/UserModel';

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: null,
            loading: true,
            canEdit: false,
        };
        this.teamId = props.match.params['id'];
        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.load()
            .then(() => UserModel.getProfile())
            .then(user => {
                if (user.id === this.state.team.ownerId)
                    this.setState(prev => ({ ...prev, canEdit:true }))
            })
            .catch(() => {});
    }

    async load() {
        return TeamModel.instance.loadTeam(this.teamId)
            .then(team => {
                if (!team.players) team.players = [];
                this.setState(prevState => ({
                    ...prevState,
                    team: team
                }))
            })// todo: handle error
            .finally(() => this.setState(prev => ({ ...prev, loading: false })));
    }

    render = () => (
        <TeamPageRender {...this.state} {...this.props}
            reload={this.load}
        />
    );
}

TeamPage.propTypes = {
    history: propTypes.object.isRequired,
    match: propTypes.object.isRequired,
};

export default TeamPage;
