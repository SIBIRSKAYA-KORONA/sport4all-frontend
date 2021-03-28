import * as React from 'react';
import TournamentGrid from 'Components/TournamentGrid/render';
import PropTypes from 'prop-types'




function TournamentGridRender(props) {

    return (
        <div style={{overflowX: 'auto'}}>
            <TournamentGrid
                system={props.tournamentData.system}
                participants={props.tournamentData.teams}
                matches={props.tournamentData.matches}
                participantOnClick={(match) => {
                    props.history.push(`/meetings/${match.id}`);
                }}
            />
        </div>
    )
}

TournamentGridRender.propTypes = {
    history: PropTypes.object.isRequired,
    tournamentData: PropTypes.object.isRequired
}

export default TournamentGridRender;
