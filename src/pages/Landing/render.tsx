import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { PATHS } from 'Constants';
import { Tournament } from 'Utils/types';
import CarouselInner from 'Components/Carousel/render';
import TournamentModel from 'Models/TournamentModel';
import TournamentCardNew from 'Components/Tournaments/Card/New/render';

import CupIcon from 'Static/icons/cup.svg';
import Button from 'Components/Button/render';
import Header from 'Components/Header/render';
import Footer from 'Components/Footer/render';
import HandsIcon from 'Static/icons/hands.svg';
import PrizeIcon from 'Static/icons/prize.svg';
import RunningTall from 'Static/images/running_tall.png';
import FootballTall from 'Static/images/football_tall.png';
import BasketballWide from 'Static/images/basketball_wide.png';
import BasketballTall from 'Static/images/basketball_tall.png';
import VolleyballTall from 'Static/images/volleyball_tall.png';


interface IProps extends RouteComponentProps {
    authed: boolean,
}

const LandingPage = (props:IProps):JSX.Element => {
    const [tours, setTours] = React.useState<Tournament[]>([]);
    const sports = [{
        name: 'Баскетбол',
        img: BasketballTall,
    },{
        name: 'Футбол',
        img: FootballTall,
    },{
        name: 'Бег',
        img: RunningTall,
    },{
        name: 'Воллейбол',
        img: VolleyballTall,
    }];
    const options = [{
        text: 'Cоздать свою спортивную команду',
        img: HandsIcon,
    },{
        text: 'Создать спортивные мероприятия и турниры',
        img: CupIcon,
    },{
        text: 'Участвовать в соревнованиях',
        img: PrizeIcon,
    }];
    const whom = [{
        title: 'Спортсменам',
        text: 'Сервис позволяет спортсменам принимать участие в турнирах в составе спортивных команд, отслеживать свою результативность, оценивать навыки других игроков, искать команды и потенциальных партнеров в выбранном виде спорта',
        button: 'Участвовать',
        authedLink: PATHS.root,
        unAuthedLink: PATHS.signup,
    },{
        title: 'Организаторам',
        text: 'Сервис дает возможность организаторам проводить турниры, контролировать каждый этап соревнования, вести статистику игроков, следить за турнирами других организаторов, автоматически переносить результаты встреч из протоколов',
        button: 'Создать соревнование',
        authedLink: PATHS.tournaments.create,
        unAuthedLink: PATHS.signup,
    }];
    React.useEffect(() => {
        TournamentModel.loadFeed(0).then(tours => setTours(tours));
    }, []);

    return (<>
        <Header {...props}/>
        <section className='first'>
            <img src={BasketballWide} alt="" className='first__bg'/>
            <div className='first__bg_cover'/>
            <div className='first__texts'>
                <div className='first__texts_container'>
                    <h1 className='first__texts_title'>SPORT FOR ALL</h1>
                    <p className='first__texts_subtext'>Главная задача нашего сервиса - упростить проведение спортивных мероприятий любительского уровня, сделав при этом процесс максимально прозрачным и удобным для участников и организаторов</p>
                    { !props.authed &&
                        <Link to={PATHS.signup}>
                            <Button color='white' type='filled' text='Присоединиться' className='first__texts_button'/>
                        </Link>
                    }
                </div>
            </div>
        </section>
        <section className='sports'>
            <div className='sports__container'>
                <h2 className='sports__title'>Виды спорта</h2>
                <CarouselInner className='sports__glide' options={{ type: 'carousel', startAt: 0, perView: 4 }} withArrows>
                    {sports.map((s, i) => <li key={i} className='sports__li'>
                        <img src={s.img} alt={s.name} className='sports__li_img'/>
                        <h2 className='sports__li_text'><span className='sports__li_text_line'>|</span>{s.name}</h2>
                    </li>)}
                </CarouselInner>
            </div>
        </section>
        <section className='options'>
            <div className="options__container">
                <h3 className='options__title'>С помощью нашего сервиса, вы имеете возможность</h3>
                <div className='options__body'>
                    {options.map((o,i) => <div className="options__body_item" key={i}>
                        <img src={o.img} alt={`${i}`}/>
                        <p>{o.text}</p>
                    </div>)}
                </div>
            </div>
        </section>
        <section className='whom'>
            <div className="whom__container">
                {whom.map((w,i) => <div key={i} className='whom__item'>
                    <h2>{w.title}</h2>
                    <p>{w.text}</p>
                    <Link to={props.authed ? w.authedLink : w.unAuthedLink}>
                        <Button color='purple' type='filled' text={w.button} className='whom__item_button'/>
                    </Link>
                </div>)}
            </div>
        </section>
        {tours.length > 0 &&
            <section className='recent_tours'>
                <div className='recent_tours__container'>
                    <h2 className='recent_tours__title'>Недавние турниры</h2>
                    <CarouselInner
                        className='recent_tours__glide'
                        options={{ type: 'carousel', perView: 4 }}
                        withArrows
                        arrowStyle={{
                            offset: -60,
                            width: 30,
                        }}
                    >
                        {tours.map((t,i) => <li key={i}>
                            <TournamentCardNew tournament={t} {...props}/>
                        </li>)}
                    </CarouselInner>
                </div>
            </section>
        }
        <Footer/>
    </>);
};

const mapStateToProps = state => ({
    authed: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(LandingPage);
