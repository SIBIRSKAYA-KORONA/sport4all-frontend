import * as React from 'react';

import { Card } from 'antd';

import { Tournament } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';
import CONST from 'Constants';


interface IProps extends RouteComponentProps {
    tournament: Tournament
}

function TournamentCard(props: IProps): JSX.Element {
    return (<Card
        onClick={() => props.history.push(CONST.PATHS.tournaments.id(props.tournament.id))}
        key={props.tournament.id}
        hoverable
        cover={
            <img alt={props.tournament.avatar.filename}
                src={props.tournament.avatar.url}
            />
        }
    >
        <Card.Meta
            title={props.tournament.name}
            description={props.tournament.about}
        />
    </Card>);
}

export default TournamentCard;
