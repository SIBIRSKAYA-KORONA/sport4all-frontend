import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Button from 'Components/Button/render';
import Header from 'Components/Header/render';
import Footer from 'Components/Footer/render';
import BasketballWide from 'Static/images/basketball_wide.png';


const LandingPage = (props:RouteComponentProps):JSX.Element => (<>
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
    <Footer/>
</>);

export default LandingPage;
