import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Row, Col } from 'antd';

import { Tournament } from 'Utils/types';
import TournamentCard from 'Components/Tournaments/Card/render';


interface IProps extends RouteComponentProps {
    tournaments: Array<Tournament>
}

function TournamentsFeed(props: IProps): JSX.Element {
    return (<Row gutter={[24, 24]} style={{ marginLeft:10, marginRight:10, marginBottom:10, width:'100%' }}>
        {props.tournaments.map(tour => <Col key={tour.id} span={6}>
            <TournamentCard tournament={tour} {...props}/>
        </Col>)}
    </Row>);
}

export default TournamentsFeed;
