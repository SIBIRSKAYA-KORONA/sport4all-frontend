import * as React from 'react';
import TournamentGrid from 'Components/TournamentGrid/render';
import PropTypes from 'prop-types'


// const prepareMatches = (roots) => {
//     // TODO: fix for double elimination and test it
//     let matches = []
//     let matchesQueue = [roots];
//     let matchesQueue2 = [];
//
//
//     while (matchesQueue.length !== 0) {
//         for (let i = 0; i < matchesQueue.length; i++) {
//             const match = matchesQueue[i];
//             matches.push({
//                 id: matches.length,
//                 child_count: 0,
//                 group_id: 0,
//                 number: i,
//                 opponent1: { id: match?.teams?.[0]?.id || null },
//                 opponent2: { id: match?.teams?.[1]?.id || null },
//
//             })
//         }
//     }
//
// }

function TournamentGridRender(props) {

    const data = {
        'participants': [
            {
                'id': 0,
                'tournament_id': 0,
                'name': 'Team 1'
            },
            {
                'id': 1,
                'tournament_id': 0,
                'name': 'Team 2'
            },
            {
                'id': 2,
                'tournament_id': 0,
                'name': 'Team 3'
            },
            {
                'id': 3,
                'tournament_id': 0,
                'name': 'Team 4'
            },
            {
                'id': 4,
                'tournament_id': 0,
                'name': 'Team 6'
            },
            {
                'id': 5,
                'tournament_id': 0,
                'name': 'Team 7'
            },
            {
                'id': 6,
                'tournament_id': 0,
                'name': 'Team 8'
            },
            {
                'id': 7,
                'tournament_id': 0,
                'name': 'Team 9'
            },
            {
                'id': 8,
                'tournament_id': 0,
                'name': 'Team 10'
            },
            {
                'id': 9,
                'tournament_id': 0,
                'name': 'Team 11'
            },
            {
                'id': 10,
                'tournament_id': 0,
                'name': 'Team 12'
            },
            {
                'id': 11,
                'tournament_id': 0,
                'name': 'Team 13'
            },
            {
                'id': 12,
                'tournament_id': 0,
                'name': 'Team 14'
            },
            {
                'id': 13,
                'tournament_id': 0,
                'name': 'Team 15'
            },
            {
                'id': 14,
                'tournament_id': 0,
                'name': 'Team 16'
            }
        ],
        'stages': [
            {
                'id': 0,
                'tournament_id': 0,
                'name': 'Этап 1',
                'type': 'double_elimination',
                'number': 1,
                'settings': {
                    'seedOrdering': [
                        'natural',
                        'natural',
                        'reverse_half_shift',
                        'reverse'
                    ],
                    'skipFirstRound': 'false',
                    'grandFinal': 'double',
                    'matchesChildCount': 0
                }
            }
        ],
        'matches': [
            {
                'id': 0,
                'number': 1,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 0,
                'child_count': 0,
                'status': 4,
                'opponent1': {
                    'id': 0,
                    'position': 1,
                    'score': 16,
                    'result': 'win'
                },
                'opponent2': {
                    'id': 1,
                    'position': 2,
                    'score': 12,
                    'result': 'loss'
                }
            },
            {
                'id': 1,
                'number': 2,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 0,
                'child_count': 0,
                'status': 3,
                'opponent1': {
                    'id': 2,
                    'position': 4,
                    'score': 8
                },
                'opponent2': {
                    'id': 3,
                    'position': 4,
                    'score': 4
                }
            },
            {
                'id': 2,
                'number': 3,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 0,
                'child_count': 0,
                'status': 0,
                'opponent1': null,
                'opponent2': {
                    'id': 4,
                    'position': 6
                }
            },
            {
                'id': 3,
                'number': 4,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 0,
                'child_count': 0,
                'status': 2,
                'opponent1': {
                    'id': 5,
                    'position': 7
                },
                'opponent2': {
                    'id': 6,
                    'position': 8
                }
            },
            {
                'id': 8,
                'number': 1,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 1,
                'child_count': 0,
                'status': 1,
                'opponent1': {
                    'id': 0
                },
                'opponent2': {
                    'id': null
                }
            },
            {
                'id': 9,
                'number': 2,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 1,
                'child_count': 0,
                'status': 1,
                'opponent1': {
                    'id': 4
                },
                'opponent2': {
                    'id': null
                }
            },
            {
                'id': 10,
                'number': 1,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 2,
                'child_count': 0,
                'status': 1,
                'opponent1': {
                    'id': null
                },
                'opponent2': {
                    'id': null
                }
            },

        ],
        'matchGames': []
    };

    const preparedTeams = props.tournamentData.teams.map((team) => {
        return {
            id: team.id,
            tournament_id: props.tournamentData.id,
            name: team.name
        };
    });

    const preparedMatches = props.tournamentData.matches;

    const myData = {
        matchGames: [],
        participants: preparedTeams,
        marches: preparedMatches,
        stages: [{
            id: 0,
            name: '',
            number: 1
        }],

    };


    console.log(data);
    console.log(myData);
    const config = {
        participantOriginPlacement: 'before',
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true,
        participantOnClick: (match) => {
            console.log(props);
            props.history.push(`/meetings/${match.id}`);
        },
    };
    return (
        <div style={{overflowX: 'auto'}}>
            <TournamentGrid data={data} config={config}/>
        </div>
    )
}

TournamentGridRender.propTypes = {
    history: PropTypes.object.isRequired,
    tournamentData: PropTypes.object.isRequired
}

export default TournamentGridRender;
