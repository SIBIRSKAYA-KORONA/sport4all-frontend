import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Row, Col, Space, Select } from 'antd';

import { Tournament } from 'Utils/types';
import TournamentCard from 'Components/Tournaments/Card/render';
import { allEventStatuses, getStatusShortTitle } from 'Utils/structUtils';


interface IProps extends RouteComponentProps {
    tournaments: Array<Tournament>
}

function TournamentsFeed(props: IProps): JSX.Element {
    const [filteredTours, setFilteredTours] = React.useState<typeof props.tournaments>([]);
    const [title, setTitle] = React.useState('');
    const [statuses, setStatuses] = React.useState(allEventStatuses());
    React.useEffect(() => {
        const filter = () => {
            setFilteredTours(props.tournaments.filter(t =>
                statuses.includes(t.status)
            ));
        };
        filter();
    }, [statuses]);

    return (<div style={{ marginLeft:10, marginRight:10, marginBottom:10, width:'100%' }}>
        <Space size='middle' direction='horizontal'>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%', minWidth:150 }}
                placeholder="Статусы"
                onChange={(values) => setStatuses(values)}
                defaultValue={statuses}
            >
                {allEventStatuses().map(stat => (<Select.Option key={stat} value={stat}>
                    {getStatusShortTitle(stat)}
                </Select.Option>))}
            </Select>
        </Space>
        <Row gutter={[24, 24]} style={{ width:'100%' }}>
            {filteredTours.map(tour => <Col key={tour.id} span={6}>
                <TournamentCard tournament={tour} {...props}/>
            </Col>)}
        </Row>
    </div>);
}

export default TournamentsFeed;
