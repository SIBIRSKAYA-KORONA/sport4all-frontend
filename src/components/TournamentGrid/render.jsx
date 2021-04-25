import * as React from 'react';
import PropTypes from 'prop-types';
import './BracketsViewer/style.scss';
import {BracketsViewer} from 'Components/TournamentGrid/BracketsViewer/main.ts';
import {EventStatus} from 'Utils/types';
import { CONST } from 'Constants';

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

    componentDidMount() {
        this.fillGridContainer();
    }

    componentDidUpdate() {
        this.clearGridContainer();
        this.fillGridContainer();
    }

    componentWillUnmount() {
        this.clearGridContainer();
    }

    render() {
        return <div ref={el => this.el = el}/>
    }

    clearGridContainer() {
        this.el.className = '';
        this.el.innerHTML = '';
    }

    fillGridContainer() {
        const system = TournamentGrid.systemsTranslation[this.props.system];
        if (!system) {
            console.error(`Unknown tournament system '${this.props.system}'. Unable to render grid`);
            return;
        }


        try {
            const participants = this.props.participants.map(
                (participant) => ({
                    id: participant.id,
                    name: participant.name
                })
            );
            const matches = TournamentGrid.parseMatches(this.props.matches, this.props.system);

            (new BracketsViewer()).render(
                {
                    participants: participants,
                    matches: matches,
                    stages: [{
                        id: 0,
                        name: '',
                        number: 0,
                        type: system,
                        settings: {}
                    }],
                },
                {
                    containerNode: this.el,
                    participantOriginPlacement: 'none',
                    showSlotsOrigin: true,
                    showLowerBracketSlotsOrigin: true,
                    highlightParticipantOnHover: true,
                    participantOnClick: this.props.participantOnClick,
                });
        } catch (e) {
            console.log('WARNING: Could not render grid');
            console.error(e);
        }
    }


    static parseMatches(matches, system) {
        const matchesCopy = JSON.parse(JSON.stringify(matches));

        switch (system) {
        case CONST.TOURNAMENTS.systems.roundRobin:
            return this.parseMatchesAsRoundRobin(matchesCopy);
        case CONST.TOURNAMENTS.systems.doubleElimination:
            console.error(`Unsupported tournament system "${system}". Unable to render grid`)
            return [];
        case CONST.TOURNAMENTS.systems.singleElimination:
            return this.parseMatchesAsSingleElimination(matchesCopy);
        default:
            console.error(`Unknown tournament system "${system}". Unable to render grid`);
            return [];
        }
    }

    static parseMatchesAsRoundRobin(matches) {
        if (matches.length === 0) {
            return [];
        }

        const matchesLastNumbers = {};
        const parsedMatches = matches.map((match) => {
            if (!(match.round in matchesLastNumbers)) {
                matchesLastNumbers[match.round] = 0;
            }

            const parsedMatch = this.parseMatch(match);
            parsedMatch.number = matchesLastNumbers[match.round]++;

            return parsedMatch;
        });

        return parsedMatches;

    }

    static parseMatchesAsSingleElimination(matches) {
        if (matches.length === 0) {
            return [];
        }

        const matchesById = matches.reduce((map, match) => {
            map[match.id] = match;
            return map
        }, {})

        // building matches tree
        let matchesTree;
        for (const match of matches) {
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

            const parsedMatch = this.parseMatch(match);
            parsedMatch.number = currentNumber;

            parsedMatches.push(parsedMatch);

            const previousMatches = match?.previousMatches || [];
            matchesQueue.push(...previousMatches);
            currentNumber += 1;

        }

        return parsedMatches;
    }


    static parseMatch(rawMatch) {
        const parsedMatch = {
            id: rawMatch.id,
            stage_id: 0,
            group_id: rawMatch.group,
            round_id: rawMatch.round,
            opponent1: {id: rawMatch?.teams?.[0]?.id || null},
            opponent2: {id: rawMatch?.teams?.[1]?.id || null},
        }

        if (rawMatch.status === EventStatus.FinishedEvent) {
            const scores = {};
            scores[rawMatch.stats[0].teamId] = rawMatch.stats[0].score;
            scores[rawMatch.stats[1].teamId] = rawMatch.stats[1].score;

            parsedMatch.opponent1.score = scores[parsedMatch.opponent1.id];
            parsedMatch.opponent2.score = scores[parsedMatch.opponent2.id];
            if (parsedMatch.opponent1.score > parsedMatch.opponent2.score) {
                parsedMatch.opponent1.result = 'win';
                parsedMatch.opponent2.result = 'loss';
            }
            if (parsedMatch.opponent1.score < parsedMatch.opponent2.score) {
                parsedMatch.opponent1.result = 'loss';
                parsedMatch.opponent2.result = 'win';
            }
        }

        return parsedMatch;
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
            status: PropTypes.number.isRequired,
            group: PropTypes.number.isRequired,
            round: PropTypes.number.isRequired,
            teams: PropTypes.array,
            prevMeetings: PropTypes.array,
        }).isRequired
    ).isRequired,

}

export default TournamentGrid;
