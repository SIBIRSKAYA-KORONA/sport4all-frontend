import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import TeamCreatePageRender from './render';
import { createTeam } from 'Actions/Team/TeamActions';
import TeamModel from 'Models/TeamModel';

class TeamCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        if (!values.name) return;
        TeamModel.instance.createTeam(values)
            .then(response => { console.log(response); })
            .catch(error => { console.error(error); })
    }

    render = () => (<TeamCreatePageRender onSubmit={this.handleSubmit}/>);
}

TeamCreatePage.propTypes = {
    createTeam: propTypes.func.isRequired,
    history: propTypes.object.isRequired,
};

export default connect(null, { createTeam })(TeamCreatePage);
