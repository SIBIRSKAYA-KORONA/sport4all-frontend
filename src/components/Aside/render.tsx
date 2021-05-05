import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { PATHS } from 'Constants';
import { UserType } from 'Store/User/UserState';

import ShirtIcon from 'Static/icons/shirt.svg';
import TrophyIcon from 'Static/icons/trophy.svg';
import TeamworkIcon from 'Static/icons/teamwork.svg';


interface IProps extends RouteComponentProps {
    user: UserType,
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
        <section className='aside__section_recent-teams'></section>
        <section className='aside__section_recent-users'></section>
        <section className='aside__section_recent-tours'></section>
    </div>
);

const mapStateToProps = state => ({
    user: state.user.user,
});

export default connect(mapStateToProps)(Aside);
