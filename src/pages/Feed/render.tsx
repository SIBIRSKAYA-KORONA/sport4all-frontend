import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Form, Input, Button, message } from 'antd';

import BasePage from 'Components/BasePage/render';
import TournamentModel from 'Models/TournamentModel';
import TournamentsFeedRow from 'Components/Tournaments/Feed/render';


const FeedPage = (props: RouteComponentProps):JSX.Element => {
    const [tournaments, setTournaments] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const load = () => {
        TournamentModel.loadFeed(tournaments.length + 10)
            .then(ts => setTournaments(prev => prev.concat(ts)))
            .catch(e => message.error(e))
            .finally(() => setLoading(false));
    };

    React.useEffect(() => { load() }, []);

    return (
        <BasePage {...props}>
            <TournamentsFeedRow tours={tournaments} {...props} />
            <Button
                type='default'
                onClick={() => load()}
                loading={loading}
            >Загрузить ещё</Button>
        </BasePage>
    );
}

export default FeedPage;
