import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Empty } from 'antd';
import { PATHS } from 'Constants';
import TournamentGrid from 'Components/TournamentGrid/render';


interface IProps extends RouteComponentProps {
    tournamentData: any
}

function TournamentGridRender(props:IProps):JSX.Element {
    return (
        props.tournamentData.matches.length > 0
            ?
            <div style={{overflowX: 'auto'}}>
                <TournamentGrid
                    system={props.tournamentData.system}
                    participants={props.tournamentData.teams}
                    matches={props.tournamentData.matches}
                    participantOnClick={(match) => {
                        props.history.push(PATHS.meetings.id(match.id));
                    }}
                />
            </div>
            : <Empty description={
                <span>Турнир ещё не сформирован<br/>Сетка появится после окончания регистрации участников</span>
            }/>
    )
}

export default TournamentGridRender;
