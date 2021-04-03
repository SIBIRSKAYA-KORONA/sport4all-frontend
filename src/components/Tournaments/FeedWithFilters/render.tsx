import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Space, Select, Divider, Typography, Input, Row, Col } from 'antd';
const { Title } = Typography;

import { Tournament } from 'Utils/types';
import { UserType } from 'Store/User/UserState';
import { allEventStatuses, getStatusShortTitle } from 'Utils/structUtils';
import TournamentsFeedRow from 'Components/Tournaments/Feed/render';
import MeetingStatusTag from 'Components/Meeting/StatusTag/render';


interface IProps extends RouteComponentProps {
    tournaments: Array<Tournament>,
    user: UserType
}

function TournamentsFeed(props: IProps): JSX.Element {
    const [filteredTours, setFilteredTours] = React.useState<typeof props.tournaments>([]);
    const [myTours, setMyTours] = React.useState<typeof props.tournaments>([]);
    const [otherTours, setOtherTours] = React.useState<typeof props.tournaments>([]);

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

    React.useEffect(() => {
        const filter = () => {
            setFilteredTours(title
                ? props.tournaments.filter(t => t.name.toLowerCase().includes(title.toLowerCase()))
                : props.tournaments
            )
        };
        filter();
    }, [title]);

    React.useEffect(() => {
        const findOwn = () => {
            setMyTours(filteredTours.filter(t => t.ownerId === props.user.id));
        };
        if (props.user) findOwn();
    }, [filteredTours]);

    React.useEffect(() => {
        const findOthers = () => {
            setOtherTours(filteredTours.filter(t => t.ownerId !== props.user.id));
        };
        findOthers();
    }, [myTours]);

    return (<div style={{ marginLeft:10, marginRight:10, marginBottom:10 }}>
        <Space className='filters__container' direction='vertical' size='middle'>
            <Title level={4}>Фильтры</Title>
            <Space direction='horizontal' size='small' style={{ width:'100%' }}>
                <Title level={5} style={{ minWidth:100 }}>Статусы</Title>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ minWidth:150, width:'auto' }}
                    placeholder="Статусы"
                    onChange={(values) => setStatuses(values)}
                    defaultValue={statuses}
                >
                    {allEventStatuses().map(stat => (<Select.Option key={stat} value={stat} style={{ height:'auto' }}>
                        {getStatusShortTitle(stat)}
                    </Select.Option>))}
                </Select>
            </Space>
            <Space direction='horizontal' size='middle'>
                <Title level={5}>Название</Title>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='CSGO'
                />
            </Space>
        </Space>
        {myTours.length > 0
            ? <>
                <Divider orientation='left' type='horizontal'>Мои турниры</Divider>
                <TournamentsFeedRow tours={myTours} {...props} />
                {otherTours.length > 0 && <>
                    <Divider orientation='left' type='horizontal'>Все турниры</Divider>
                    <TournamentsFeedRow tours={otherTours} {...props} />
                </>}
            </>
            : <TournamentsFeedRow tours={filteredTours} {...props} />
        }
    </div>);
}

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps)(TournamentsFeed);
