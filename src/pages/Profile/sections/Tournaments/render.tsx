import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Spin, Button, Empty } from 'antd';

import CONST from 'Constants';
import { Tournament, User } from 'Utils/types';
import TournamentModel from 'Models/TournamentModel';
import TournamentsFeedWithFilters from 'Components/Tournaments/FeedWithFilters/render';
import LoadingContainer from 'Components/Loading/render';


interface IProps extends RouteComponentProps {
    profile: User,
    user: User
}

const TournamentsProfileSection = (props:IProps):JSX.Element => {
    const [loadingOwnTournaments, setLoadingOwnTournaments] = useState(true);
    const [tournamentsOwned, setTournamentsOwned] = useState<Tournament[]>([]);
    const [canEdit, setCanEdit] = React.useState(false);

    useEffect(() => {
        setCanEdit(props.profile.id === props.user.id);
    }, [props.profile, props.user]);

    useEffect(() => {
        const load = () => {
            TournamentModel.getTournaments(props.profile.id).then(tours => {
                setTournamentsOwned(tours.owner.sort((a, b) => a.status - b.status));
                setLoadingOwnTournaments(false);
            });
        }
        load();
    }, [props.match.params['nickname']]);

    return (<>
        {canEdit &&
            <Button type='primary' style={{ marginBottom:20, display:'block' }}>
                <Link to={CONST.PATHS.tournaments.create}>Создать</Link>
            </Button>
        }
        <LoadingContainer loading={loadingOwnTournaments} empty={{ check:tournamentsOwned.length === 0, message:'Нет турниров' }}>
            <TournamentsFeedWithFilters tournaments={tournamentsOwned} {...props} />
        </LoadingContainer>
    </>);
};

export default TournamentsProfileSection;
