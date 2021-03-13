import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import TeamCreatePageRender from './render';
import { createTeam } from 'Actions/Team/TeamActions';
import TeamModel from 'Models/TeamModel';

class TeamCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            about: '',
            location: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.name || !this.state.about) return;
        const team = {
            name: this.state.name,
            about: this.state.about,
            location: this.state.location
        };
        TeamModel.instance.createTeam(team)
            .then(response => { console.log(response); })
            .catch(error => { console.error(error); })
            .finally(() => {
                this.setState({
                    name: '',
                    about: '',
                    location: '',
                })
            })
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    render() {
        return (
            <TeamCreatePageRender
                onChange={this.handleInputChange}
                onSubmit={this.handleSubmit}
                name={this.state.name}
                about={this.state.about}
                location={this.state.location}
            />
        )
    }
}

TeamCreatePage.propTypes = {
    createTeam: propTypes.func.isRequired,
    history: propTypes.object.isRequired,
};

export default connect(null, { createTeam })(TeamCreatePage);
