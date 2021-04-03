import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Spin, Typography, Space, Button, Empty } from 'antd';
const { Title } = Typography;

import CONST from 'Constants';
import { User } from 'Utils/types';
import TournamentModel from 'Models/TournamentModel';
import { UserAuthenticatedType } from 'Store/User/UserState';
import TournamentsFeedWithFilters from 'Components/Tournaments/FeedWithFilters/render';


const initTeams: [any?] = [];

interface IProps extends RouteComponentProps {
    user: User,
    isAuthenticated: UserAuthenticatedType
}

const TournamentsProfileSection = (props:IProps):JSX.Element => {
    const [loadingOwnTournaments, setLoadingOwnTournaments] = useState(true);
    const [tournamentsOwned, setTournamentsOwned] = useState(initTeams);

    useEffect(() => {
        const load = () => {
            TournamentModel.getTournaments(props.user.id).then(tours => {
                setTournamentsOwned(tours.owner);
                setLoadingOwnTournaments(false);
            });
        }
        load();
    }, []);

    const filteredTours = tournamentsOwned // TODO: fix duplicates on the backend
        // .filter(t => t.ownerId === props.user.id)
        .filter((t, index) => tournamentsOwned.findIndex(tt => t.id === tt.id) === index)
        .sort((a, b) => a.status - b.status);

    return (<>
        <Button type='primary'>
            <Link to={CONST.PATHS.tournaments.create}>Создать</Link>
        </Button>
        {loadingOwnTournaments
            ? <Spin/>
            : filteredTours.length > 0
                ? <TournamentsFeedWithFilters tournaments={filteredTours} {...props} />
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
    </>);
};

export default TournamentsProfileSection;
