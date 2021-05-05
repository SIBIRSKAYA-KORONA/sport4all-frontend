import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { PATHS } from 'Constants';
import { UserType } from 'Store/User/UserState';
import { IRecentState } from 'Store/Recent/RecentState';

import ShirtIcon from 'Static/icons/shirt.svg';
import TrophyIcon from 'Static/icons/trophy.svg';
import TeamworkIcon from 'Static/icons/teamwork.svg';
import { Avatarable } from 'Utils/types';
import { Avatar } from 'antd';
import { lettersForAvatar } from 'Utils/utils';
import { lettersForUserAvatar } from 'Utils/structUtils';


interface IProps extends RouteComponentProps {
    user: UserType,
    recent: IRecentState,
}

const Aside = (props:IProps):JSX.Element => (
    <div className='aside'>
        {props.user && <>
            <section className='aside__section_personal'>
                <Link className="aside__link" to={PATHS.profile.nickname(props.user.nickname)}>
                    <img src={ShirtIcon} alt={ShirtIcon}/>
                    <p>Профиль</p>
                </Link>
            </section>
            <section className='aside__section_create'>
                <h5 className='aside__title'>Создать</h5>
                <Link className="aside__link" to={PATHS.tournaments.create}>
                    <img src={TrophyIcon} alt={TrophyIcon}/>
                    <p>Турнир</p>
                </Link>
                <Link className="aside__link" to={PATHS.teams.create}>
                    <img src={TeamworkIcon} alt={TeamworkIcon}/>
                    <p>Команда</p>
                </Link>
            </section>
        </>}
        {props.recent.teams.length > 0 &&
            <section className='aside__section_recent-teams'>
                <h5 className='aside__title'>Команды</h5>
                <div className="aside__recents">
                    {props.recent.teams.slice(0,3).map(t => <AsideEntity key={t.id} item={t} link={PATHS.teams.id(t.id)} {...props}/>)}
                </div>
            </section>
        }
        {props.recent.users.length > 0 &&
            <section className='aside__section_recent-users'>
                <h5 className='aside__title'>Спортсмены</h5>
                <div className="aside__recents">
                    {props.recent.users.slice(0,3).map(u => <div key={u.id} className='aside__entity' onClick={() => props.history.push(PATHS.profile.nickname(u.nickname))}>
                        <Avatar className='aside__entity_img' src={u.avatar?.url} alt={u.avatar.filename}>{lettersForUserAvatar(u)}</Avatar>
                        <p>{u.name}</p>
                    </div>)}
                </div>
            </section>
        }
        {props.recent.tours.length > 0 &&
            <section className='aside__section_recent-tours'>
                <h5 className='aside__title'>Соревнования</h5>
                <div className="aside__recents">
                    {props.recent.tours.slice(0,3).map(t => <AsideEntity key={t.id} item={t} link={PATHS.tournaments.id(t.id)} {...props}/>)}
                </div>
            </section>
        }
    </div>
);

const AsideEntity = (props:RouteComponentProps & { item:Avatarable, link:string }) => (
    <div className='aside__entity' onClick={() => props.history.push(props.link)}>
        <Avatar className='aside__entity_img' src={props.item.avatar.url} alt={props.item.avatar.filename}>{lettersForAvatar(props.item.name)}</Avatar>
        <p>{props.item.name}</p>
    </div>
);

const mapStateToProps = state => ({
    user: state.user.user,
    recent: state.recent,
});

export default connect(mapStateToProps)(Aside);
