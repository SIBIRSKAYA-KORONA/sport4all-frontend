import * as React from 'react';
import propTypes from 'prop-types';

import TeamCreatePageRender from './render';
import TeamModel from 'Models/TeamModel';

class TeamCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        if (!values.name) return;
        TeamModel.instance.createTeam(values)
            .then(() => {
                console.log('redirecting');
                history.push('/teams/list');
            })
            .catch(error => { console.error(error); })
    }

    render = () => (<TeamCreatePageRender onSubmit={this.handleSubmit}/>);
}

TeamCreatePage.propTypes = {
    createTeam: propTypes.func.isRequired,
    history: propTypes.object.isRequired,
};

export default TeamCreatePage;
