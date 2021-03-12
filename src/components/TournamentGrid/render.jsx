import * as React from 'react';
import PropTypes from 'prop-types';
import './BracketsViewer/style.scss';
import {BracketsViewer} from 'Components/TournamentGrid/BracketsViewer/main.ts';

class TournamentGrid extends React.Component {
    componentDidMount() {
        (new BracketsViewer()).render(
            {
                stages: this.props.data.stages,
                matches: this.props.data.matches,
                matchGames: this.props.data.matchGames,
                participants: this.props.data.participants,
            },
            {
                containerNode: this.el,
                participantOriginPlacement: this.props.config.participantOriginPlacement,
                showSlotsOrigin: this.props.config.showSlotsOrigin,
                showLowerBracketSlotsOrigin: this.props.config.showLowerBracketSlotsOrigin,
                highlightParticipantOnHover: this.props.config.highlightParticipantOnHover,
                participantOnClick: this.props.config.participantOnClick,
            });
    }

    componentWillUnmount() {
        this.el.className = '';
        this.el.innerHTML = '';
    }

    render() {
        return <div ref={el => this.el = el}/>
    }
}

TournamentGrid.propTypes = {
    // types.d.ts: ViewerData
    data: PropTypes.shape({
        stages: PropTypes.array.isRequired,
        matches: PropTypes.array.isRequired,
        matchGames: PropTypes.array.isRequired,
        participants: PropTypes.array.isRequired,
    }).isRequired,

    // types.d.ts: Config
    config: PropTypes.shape({
        participantOriginPlacement: PropTypes.string,
        showSlotsOrigin: PropTypes.bool,
        showLowerBracketSlotsOrigin: PropTypes.bool,
        highlightParticipantOnHover: PropTypes.bool,
        participantOnClick: PropTypes.func,
    }),
}

export default TournamentGrid;
