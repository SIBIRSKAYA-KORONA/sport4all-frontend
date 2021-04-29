import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { List, Typography } from 'antd';
const { Text } = Typography;

import { PATHS } from 'Constants';
import { Stats, User } from 'Utils/types';
import { parseSeconds } from 'Utils/utils';
import ProfileModel from 'Models/ProfileModel';
import LoadingContainer from 'Components/Loading/render';
import { ClockCircleOutlined } from '@ant-design/icons';


interface IProps extends RouteComponentProps {
    profile: User
}

const HistorySubPage = (props:IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(true);
    const [stats, setStats] = React.useState<Stats[]>([]);

    React.useEffect(() => {
        setLoading(true);
        ProfileModel.loadStats(props.profile.id)
            .then((stats:Stats[]) => setStats(stats))
            .finally(() => setTimeout(() => setLoading(false), 500));
    }, [props.profile]);

    return <LoadingContainer loading={loading} empty={{ check:stats.length === 0, message:'Нет истории выступлений' }}>
        <h3>Результаты выступлений</h3>
        <List
            dataSource={stats}
            style={{ margin:10 }}
            itemLayout='horizontal'
            renderItem={stats => (
                <List.Item
                    style={{ paddingLeft:10 }}
                    className='row'
                >
                    <List.Item.Meta
                        title={<Text>Очков: {stats.score}</Text>}
                        description={<>
                            <ClockCircleOutlined/> {parseSeconds(stats.created)} <Link to={PATHS.meetings.id(stats.meetingId)}>Встреча</Link>
                        </>}
                    />
                </List.Item>
            )}
        />
    </LoadingContainer>;
};

export default HistorySubPage;
