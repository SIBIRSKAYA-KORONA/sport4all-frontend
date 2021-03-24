import * as React from 'react';
import PropTypes from 'prop-types'
import TournamentPageRender from './render';

class TournamentPage extends React.Component {
    render() {
        return (
            <TournamentPageRender {...this.props} tournamentId={Number(this.props.match.params.tournamentId || 0)}/>
        )
    }
}

TournamentPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tournamentId: PropTypes.number.isRequired
        }).isRequired
    }).isRequired,
}

export default TournamentPage;
