import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { PATHS } from 'Constants';
import { Tournament } from 'Utils/types';
import { dateWithSlashes } from 'Utils/utils';


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
            : <div style={{ width:'100%', height:150, textAlign:'center', lineHeight:'150px', backgroundColor:'lightgray', color:'white'}}>Иконки скоро будут</div>
        }
        <p className='tournament-card-new__date'>{dateWithSlashes(new Date(t.created*1000))}</p>
        <h4 className='tournament-card-new__title'>{t.name}</h4>
    </div>);
}

export default TournamentCardNew;
