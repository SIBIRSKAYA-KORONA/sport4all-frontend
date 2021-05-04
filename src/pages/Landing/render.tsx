import './style.scss';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Glide from '@glidejs/glide'

import TournamentModel from 'Models/TournamentModel';

import Button from 'Components/Button/render';
import Header from 'Components/Header/render';
import Footer from 'Components/Footer/render';
import BasketballWide from 'Static/images/basketball_wide.png';
import BasketballTall from 'Static/images/basketball_tall.png';
import FootballTall from 'Static/images/football_tall.png';
import RunningTall from 'Static/images/running_tall.png';
import VolleyballTall from 'Static/images/volleyball_tall.png';
import Arrow from 'Static/icons/arrow_circled.svg';

import HandsIcon from 'Static/icons/hands.svg';
import CupIcon from 'Static/icons/cup.svg';
import PrizeIcon from 'Static/icons/prize.svg';
import { connect } from 'react-redux';
import { PATHS } from 'Constants';
import LoadingContainer from 'Components/Loading/render';
import { Tournament } from 'Utils/types';
import TournamentCardNew from 'Components/Tournaments/Card/New/render';


interface IProps extends RouteComponentProps {
    authed: boolean,
}

const LandingPage = (props:IProps):JSX.Element => {
    const [tours, setTours] = React.useState<Tournament[]>([]);
    const [loadingTours, setLoadingTours] = React.useState(true);
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
        text: 'Ornare arcu at vel libero faucibus eu aenean. Magna facilisi cras interdum hac neque, nunc, massa amet. Sollicitudin adipiscing quisque quam pharetra dui placerat justo. Magna viverra ut tortor magna gravida cras a integer. Vitae proin sed nisl id imperdiet porta vitae.',
        button: 'Участвовать',
        authedLink: PATHS.root,
        unAuthedLink: PATHS.signup,
    },{
        title: 'Организаторам',
        text: 'A mi nunc, fringilla varius ac. Non enim sed volutpat felis porta urna et urna, hendrerit. In integer in turpis nunc viverra risus amet facilisis semper. Ac nisi venenatis tempor tempus, velit molestie. Sit turpis feugiat amet, elementum.',
        button: 'Создать соревнование',
        authedLink: PATHS.tournaments.create,
        unAuthedLink: PATHS.signup,
    }];
    React.useEffect(() => {
        TournamentModel.loadFeed(0)
            .then(tours => setTours(tours))
            .finally(() => setLoadingTours(false));
        new Glide('.sports .glide', {
            type: 'carousel',
            startAt: 0,
            perView: 4,
        }).mount();
    }, []);

    React.useEffect(() => {
        if (!loadingTours) {
            new Glide('.recent_tours .glide', {
                type: 'carousel',
                startAt: 0,
                perView: 4,
            }).mount();
        }
    }, [loadingTours]);
    return (<>
        <Header {...props}/>
        <section className='first'>
            <img src={BasketballWide} alt="" className='first__bg'/>
            <div className='first__bg_cover'/>
            <div className='first__texts'>
                <div className='first__texts_container'>
                    <h1 className='first__texts_title'>SPORT FOR ALL</h1>
                    <p className='first__texts_subtext'>Информация о сервисе.Tellus ligula consectetur feugiat nisi, eget adipiscing facilisis nunc elementum. Quam massa mauris facilisi nibh nunc tellus ut. Mauris enim, scelerisque nam sit lobortis tristique. Quam massa mauris facilisi nibh nunc tellus ut.</p>
                    <Button type='white' text='Присоединиться' className='first__texts_button'/>
                </div>
            </div>
        </section>
        <section className='sports'>
            <div className='sports__container'>
                <h2 className='sports__title'>Виды спорта</h2>
                <div className="glide">
                    <div className="glide__arrows" data-glide-el="controls">
                        <img className="glide__arrow glide__arrow--left" data-glide-dir="<" src={Arrow} alt="prev"/>
                        <img className="glide__arrow glide__arrow--right" data-glide-dir=">" src={Arrow} alt="next"/>
                    </div>
                    <div className="glide__track" data-glide-el="track">
                        <ul className="glide__slides sports__ul">
                            {sports.map((s, i) => <li key={s.name + i} className='glide_slide sports__li'>
                                <img src={s.img} alt={s.name} className='sports__li_img'/>
                                <h2 className='sports__li_text'><span className='sports__li_text_line'>|</span>{s.name}</h2>
                            </li>)}
                        </ul>
                    </div>
                </div>
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
                        <Button type='purple' text={w.button} className='whom__item_button'/>
                    </Link>
                </div>)}
            </div>
        </section>
        <section className='recent_tours'>
            <div className='recent_tours__container'>
                <h2 className='recent_tours__title'>Недавние турниры</h2>
                <LoadingContainer loading={loadingTours}>
                    <div className="glide">
                        <div className="glide__arrows" data-glide-el="controls">
                            <img className="glide__arrow glide__arrow--left" data-glide-dir="<" src={Arrow} alt="prev"/>
                            <img className="glide__arrow glide__arrow--right" data-glide-dir=">" src={Arrow} alt="next"/>
                        </div>
                        <div className="glide__track" data-glide-el="track">
                            <ul className="glide__slides">
                                {tours.map((t,i) => <li key={i} className='glide_slide'>
                                    <TournamentCardNew tournament={t} {...props}/>
                                </li>)}
                            </ul>
                        </div>
                    </div>
                </LoadingContainer>
            </div>
        </section>
        <Footer/>
    </>);
};

const mapStateToProps = state => ({
    authed: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(LandingPage);
