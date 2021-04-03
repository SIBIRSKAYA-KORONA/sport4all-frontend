import * as React from 'react';

import { Form, Input, Button, message } from 'antd';

import BasePage from 'Components/BasePage/render';
import { RouteComponentProps } from 'react-router-dom';
import { Tournament } from 'Utils/types';
import TournamentsFeedRow from 'Components/Tournaments/Feed/render';


interface IProps extends RouteComponentProps {
    tournaments: Tournament[]
}

const FeedPage = (props: IProps):JSX.Element => {
    const [loading, setLoading] = React.useState([]);
    const load = () => {
        console.log(loading);
    };

    React.useEffect(() => load(), []);

    return (
        <BasePage {...props}>
            <TournamentsFeedRow tours={props.tournaments} {...props} />
            <Button
                type='default'
                onClick={() => load()}
            >Загрузить ещё</Button>
        </BasePage>
    );
}

export default FeedPage;
