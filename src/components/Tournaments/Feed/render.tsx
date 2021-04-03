import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Row, Col } from 'antd';

import { Tournament } from 'Utils/types';
import TournamentCard from 'Components/Tournaments/Card/render';


interface IProps extends RouteComponentProps {
    tours: Array<Tournament>
}

function TournamentsFeedRow(props: IProps): JSX.Element {
    return (<Row gutter={[24, 24]}>
        {props.tours.map(tour => <Col key={tour.id} span={6}>
            <TournamentCard tournament={tour} {...props}/>
        </Col>)}
    </Row>);
}

export default TournamentsFeedRow;
