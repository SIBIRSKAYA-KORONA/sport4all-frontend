import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Space, Divider, Typography, Input } from 'antd';
const { Title } = Typography;

import { UserType } from 'Store/User/UserState';
import { EventStatus, Tournament } from 'Utils/types';
import SportSelect from 'Components/Inputs/sportSelect';
import StatusSelect from 'Components/Inputs/statusSelect';
import TournamentsFeedRow from 'Components/Tournaments/Feed/render';


interface IProps extends RouteComponentProps {
    tournaments: Array<Tournament>,
    user: UserType
}

function TournamentsFeed(props: IProps): JSX.Element {
    const [filteredTours, setFilteredTours] = React.useState<typeof props.tournaments>([]);
    const [myTours, setMyTours] = React.useState<typeof props.tournaments>([]);
    const [otherTours, setOtherTours] = React.useState<typeof props.tournaments>([]);

    const [title, setTitle] = React.useState('');
    const [statuses, setStatuses] = React.useState<EventStatus[]>([]);
    const [sports, setSports] = React.useState<string[]>([]);

    React.useEffect(() => {
        const filter = () => {
            let filtered = props.tournaments;
            if (statuses.length > 0)
                filtered = filtered.filter(t => statuses.includes(t.status));
            if (title)
                filtered = filtered.filter(t => t.name.toLowerCase().includes(title.toLowerCase()));
            if (sports.length > 0)
                filtered = filtered.filter(t => sports.find(s => s === t.sport));
            setFilteredTours(filtered);
        };
        filter();
    }, [title, statuses, sports]);

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
                <StatusSelect onChange={values => setStatuses(values)}/>
            </Space>
            <Space direction='horizontal' size='small' style={{ width:'100%' }}>
                <Title level={5} style={{ minWidth:100 }}>Вид спорта</Title>
                <SportSelect onChange={values => setSports(values)} />
            </Space>
            <Space direction='horizontal' size='middle'>
                <Title level={5}>Название</Title>
                <Input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
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
