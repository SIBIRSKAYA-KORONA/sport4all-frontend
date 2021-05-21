import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { PATHS } from 'Constants';
import { Tournament } from 'Utils/types';
import { dateWithSlashes } from 'Utils/utils';
import Trophy from 'Static/icons/trophy.svg'

interface IProps extends RouteComponentProps {
    tournament: Tournament
}

function TournamentCardNew(props: IProps): JSX.Element {
    const t = props.tournament;
    return (<div
        className='tournament-card-new'
        onClick={() => props.history.push(PATHS.tournaments.id(props.tournament.id))}
    >
        {t.avatar.url
            ? <img className='tournament-card-new__img' src={t.avatar.url} alt={t.avatar.filename}/>
            :
            <div className='tournament-card-new__placeholder'>
                <img className={'tournament-card-new__placeholder_image'} src={Trophy} alt={'Tournament card'}/>
            </div>
        }
        <p className='tournament-card-new__date'>{dateWithSlashes(new Date(t.created*1000))}</p>
        <h4 className='tournament-card-new__title'>{t.name}</h4>
    </div>);
}

export default TournamentCardNew;
