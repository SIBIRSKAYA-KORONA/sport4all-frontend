import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Image, Space, Typography } from 'antd';
const { Title, Text } = Typography;
import { TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';

import CONST from 'Constants';
import { formatDate } from 'Utils/utils';
import { Tournament } from 'Utils/types';
import MeetingStatusTag from 'Components/Meeting/StatusTag/render';


interface IProps extends RouteComponentProps {
    tournament: Tournament
}

function TournamentCard(props: IProps): JSX.Element {
    const t = props.tournament;
    return (<div
        className='tournament-card'
        onClick={() => props.history.push(CONST.PATHS.tournaments.id(props.tournament.id))}
    >
        {t.avatar.url &&
            <Image className='tournament-card__img' src={t.avatar.url} alt={t.avatar.filename}/>
        }
        <Space size='small' align='start' direction='vertical' className='tournament-card__body'>
            <h3 className='tournament-card__title'>{t.name}</h3>
            <MeetingStatusTag status={t.status}/>
            {t.teams &&
                <Space direction='vertical' size='small'>
                    <TeamOutlined />
                    <Text type='secondary'>{t.teams.length} команд</Text>
                </Space>
            }
            <Space direction='horizontal' size='small'>
                <ClockCircleOutlined />
                <Text type='secondary'>{formatDate(new Date(t.created*1000))}</Text>
            </Space>
        </Space>
    </div>);
}

export default TournamentCard;
