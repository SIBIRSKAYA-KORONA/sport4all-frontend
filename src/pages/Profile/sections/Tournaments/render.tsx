import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Spin, Button, Empty } from 'antd';

import CONST from 'Constants';
import { User } from 'Utils/types';
import TournamentModel from 'Models/TournamentModel';
import { UserAuthenticatedType } from 'Store/User/UserState';
import TournamentsFeedWithFilters from 'Components/Tournaments/FeedWithFilters/render';


const initTeams: [any?] = [];

interface IProps extends RouteComponentProps {
    profile: User,
    isAuthenticated: UserAuthenticatedType
}

const TournamentsProfileSection = (props:IProps):JSX.Element => {
    const [loadingOwnTournaments, setLoadingOwnTournaments] = useState(true);
    const [tournamentsOwned, setTournamentsOwned] = useState(initTeams);

    useEffect(() => {
        const load = () => {
            TournamentModel.getTournaments(props.profile.id).then(tours => {
                setTournamentsOwned(tours.owner);
                setLoadingOwnTournaments(false);
            });
        }
        load();
    }, [props.match.params['nickname']]);

    const filteredTours = tournamentsOwned
        .filter((t, index) => tournamentsOwned.findIndex(tt => t.id === tt.id) === index)
        .sort((a, b) => a.status - b.status);

    return (<>
        <Button type='primary' style={{ marginBottom:20, display:'block' }}>
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
