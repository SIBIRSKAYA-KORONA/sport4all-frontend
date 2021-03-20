import * as React from 'react';
import TournamentGrid from 'Components/TournamentGrid/render';
import PropTypes from 'prop-types'

function TournamentGridRender() {

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
                    'position': 3,
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
                'id': 4,
                'number': 5,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 0,
                'child_count': 0,
                'status': 2,
                'opponent1': {
                    'id': 7,
                    'position': 9
                },
                'opponent2': {
                    'id': 8,
                    'position': 10
                }
            },
            {
                'id': 5,
                'number': 6,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 0,
                'child_count': 0,
                'status': 2,
                'opponent1': {
                    'id': 9,
                    'position': 11
                },
                'opponent2': {
                    'id': 10,
                    'position': 12
                }
            },
            {
                'id': 6,
                'number': 7,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 0,
                'child_count': 0,
                'status': 2,
                'opponent1': {
                    'id': 11,
                    'position': 13
                },
                'opponent2': {
                    'id': 12,
                    'position': 14
                }
            },
            {
                'id': 7,
                'number': 8,
                'stage_id': 0,
                'group_id': 0,
                'round_id': 0,
                'child_count': 0,
                'status': 2,
                'opponent1': {
                    'id': 13,
                    'position': 15
                },
                'opponent2': {
                    'id': null,
                    'position': 16
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

        ],
        'matchGames': []
    };

    const config = {
        participantOriginPlacement: 'before',
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true,
        participantOnClick: (match, teamId) => {
            console.log('TeamId: ', teamId);
            console.log('Match data: ', match);
        },
    };
    return (
        <div style={{overflowX: 'auto'}}>
            <TournamentGrid data={data} config={config}/>
        </div>
    )
}

TournamentGridRender.propTypes = {
    gridData: PropTypes.shape({
        participants: PropTypes.arrayOf({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,

        system: PropTypes.string.isRequired,

        matches: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            number: PropTypes.number.isRequired,
            stage_id: PropTypes.number.isRequired,
            round_id: PropTypes.number.isRequired,
            status: PropTypes.number.isRequired,
            opponent1: PropTypes.shape({
                id: PropTypes.number.isRequired,
                position: PropTypes.string.isRequired,
                score: PropTypes.number.isRequired,
                result: PropTypes.oneOf(['win', 'draw', 'loss'])
            }).isRequired,
            opponent2: PropTypes.shape({
                id: PropTypes.number.isRequired,
                position: PropTypes.string.isRequired,
                score: PropTypes.number.isRequired,
                result: PropTypes.oneOf(['win', 'draw', 'loss'])
            }).isRequired
        })).isRequired
    }).isRequired
}

export default TournamentGridRender;
