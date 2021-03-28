import * as React from 'react';
import PropTypes from 'prop-types';
import './BracketsViewer/style.scss';
import {BracketsViewer} from 'Components/TournamentGrid/BracketsViewer/main.ts';
import CONST from 'Constants';

class TournamentGrid extends React.Component {
    static get systems() {
        return {
            roundRobin: 'round_robin',
            singleElimination: 'single_elimination',
            doubleElimination: 'double_elimination',
        };
    }

    static get systemsTranslation() {
        const translator = {};
        translator[CONST.TOURNAMENTS.systems.roundRobin] = this.systems.roundRobin;
        translator[CONST.TOURNAMENTS.systems.singleElimination] = this.systems.singleElimination;
        translator[CONST.TOURNAMENTS.systems.doubleElimination] = this.systems.doubleElimination;
        return translator;
    }

    constructor(props) {
        super(props);
        this.system = TournamentGrid.systemsTranslation[this.props.system];
        this.participants = this.props.participants.map(
            (participant) => ({
                id: participant.id,
                name: participant.name
            })
        );
        this.matches = TournamentGrid.parseMatches(this.props.matches, this.props.system);
        this.participantOnClickHandler = this.props.participantOnClick;
    }

    componentDidMount() {
        if (!this.system) {
            console.error(`Unknown tournament system "${this.props.system}". Unable to render grid`);
            return;
        }

        try {
            (new BracketsViewer()).render(
                {
                    participants: this.participants,
                    matches: this.matches,
                    stages: [{
                        id: 0,
                        name: '',
                        number: 0,
                        type: this.system,
                        settings: {}
                    }],
                },
                {
                    containerNode: this.el,
                    participantOriginPlacement: 'none',
                    showSlotsOrigin: true,
                    showLowerBracketSlotsOrigin: true,
                    highlightParticipantOnHover: true,
                    participantOnClick: this.participantOnClickHandler,
                });
        } catch (e) {
            console.error('Could not render grid');
        }
    }

    componentWillUnmount() {
        this.el.className = '';
        this.el.innerHTML = '';
    }

    render() {
        return <div ref={el => this.el = el}/>
    }

    static parseMatches(matches, system) {
        switch (system) {
        case CONST.TOURNAMENTS.systems.roundRobin:
        case CONST.TOURNAMENTS.systems.doubleElimination:
            console.error(`Unsupported tournament system "${system}". Unable to render grid`)
            return [];
        case CONST.TOURNAMENTS.systems.singleElimination:
            return this.parseMatchesAsSingleElimination(matches);
        default:
            console.error(`Unknown tournament system "${system}". Unable to render grid`);
            return [];
        }
    }

    static parseMatchesAsSingleElimination(matches) {
        const matchesCopy = [...matches];
        const matchesById = matchesCopy.reduce((map, match) => {
            map[match.id] = match;
            return map
        }, {})

        // building matches tree
        let matchesTree;
        for (const match of matchesCopy) {
            const nextMatch = matchesById[match.nextMeetingID];
            if (!nextMatch) {
                matchesTree = match;
                continue;
            }

            if (!nextMatch.previousMatches) {
                nextMatch.previousMatches = [match];
            } else {
                nextMatch.previousMatches.push(match);
            }
        }

        // preparing data for grid
        const parsedMatches = [];
        let matchesQueue = [matchesTree];

        let currentRound = matchesTree.round;
        let currentNumber = 1;
        while (matchesQueue.length !== 0) {
            const match = matchesQueue.shift();

            if (currentRound !== match.round) {
                currentRound = match.round;
                currentNumber = 1;
            }

            parsedMatches.push({
                id: match.id,
                number: currentNumber,
                stage_id: 0,
                group_id: match.group,
                round_id: match.round,
                opponent1: {id: match?.teams?.[0]?.id || null},
                opponent2: {id: match?.teams?.[1]?.id || null},
            });

            const previousMatches = match?.previousMatches || [];
            matchesQueue.push(...previousMatches);
            currentNumber += 1;

        }

        return parsedMatches;
    }

}

TournamentGrid.propTypes = {
    system: PropTypes.oneOf(Object.values(CONST.TOURNAMENTS.systems)).isRequired,
    participantOnClick: PropTypes.func,

    participants: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,

    matches: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            group: PropTypes.number.isRequired,
            round: PropTypes.number.isRequired,
            teams: PropTypes.array,
            prevMeetings: PropTypes.array,
        }).isRequired
    ).isRequired,

}

export default TournamentGrid;
