import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import TeamCreatePageRender from './render';
import { createTeam } from 'Actions/Team/TeamActions';
import TeamModel from 'Models/TeamModel';

class TeamCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            sport: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.title || !this.state.sport) return;
        const team = {
            title: this.state.title,
            description: this.state.description,
            sport: this.state.sport
        };
        this.props.createTeam(team);
        TeamModel.instance.saveTeams().then(() => {
            this.setState({
                title: '',
                description: '',
                sport: '',
            });
            // history.push('/team/list');
        });
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(this.state);
    }

    render() {
        return (
            <TeamCreatePageRender
                onChange={this.handleInputChange}
                onSubmit={this.handleSubmit}
                title={this.state.title}
                description={this.state.description}
                sport={this.state.sport}
            />
        )
    }
}

TeamCreatePage.propTypes = {
    createTeam: propTypes.func.isRequired,
};

export default connect(null, { createTeam })(TeamCreatePage);
