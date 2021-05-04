import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Glide from '@glidejs/glide'

import Button from 'Components/Button/render';
import Header from 'Components/Header/render';
import Footer from 'Components/Footer/render';
import BasketballWide from 'Static/images/basketball_wide.png';
import BasketballTall from 'Static/images/basketball_tall.png';
import FootballTall from 'Static/images/football_tall.png';
import RunningTall from 'Static/images/running_tall.png';
import VolleyballTall from 'Static/images/volleyball_tall.png';
import Arrow from 'Static/icons/arrow_circled.svg';


const LandingPage = (props:RouteComponentProps):JSX.Element => {
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
    React.useEffect(() => {
        new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 4,
        }).mount();
    }, []);
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
        <Footer/>
    </>);
};

export default LandingPage;
