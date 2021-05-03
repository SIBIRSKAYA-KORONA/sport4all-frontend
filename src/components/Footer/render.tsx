import './style.scss';
import { Form, Image } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { PATHS } from 'Constants';
import PinIcon from 'Static/icons/pin.svg';
import Logo from 'Static/images/bear.jpg';
import Button from 'Components/Button/render';
import Input from 'Components/Inputs/input';

function Footer() {
    return (
        <div className='footer'>
            <div className="footer__container">
                <section className='footer__item'>
                    <Image src={Logo} className='footer__logo' preview={false}/>
                    <div className='footer__contact_container'>
                        <div className='footer__contact'>
                            <Image src={PinIcon} className='footer__contact_icon' preview={false}/>
                            <p className='footer__contact_text'>Москва, Россия</p>
                        </div>
                    </div>
                </section>
                <section className='footer__item_main'>
                    <div className="footer__links">
                        <h2 className='footer__link_header'>Команды</h2>
                        <Link to={PATHS.root} className='footer__link'>Команды</Link>
                        <Link to={PATHS.root} className='footer__link'>Статистика</Link>
                        <Link to={PATHS.root} className='footer__link'>Игроки</Link>
                    </div>
                    <div className="footer__links">
                        <h2 className='footer__link_header'>Матчи</h2>
                        <Link to={PATHS.root} className='footer__link'>Результаты</Link>
                        <Link to={PATHS.root} className='footer__link'>Таймлайн</Link>
                        <Link to={PATHS.root} className='footer__link'>Галерея</Link>
                    </div>
                    <div className="footer__links">
                        <h2 className='footer__link_header'>Турниры</h2>
                        <Link to={PATHS.root} className='footer__link'>Сетка</Link>
                        <Link to={PATHS.root} className='footer__link'>Команды</Link>
                        <Link to={PATHS.root} className='footer__link'>Создание соревнования</Link>
                    </div>
                    <div className="footer__links">
                        <h2 className='footer__link_header'>Поиск</h2>
                        <Link to={PATHS.root} className='footer__link'>Турниры</Link>
                        <Link to={PATHS.root} className='footer__link'>Матчи</Link>
                        <Link to={PATHS.root} className='footer__link'>Игроки</Link>
                    </div>
                </section>
                <section className='footer__item footer__form'>
                    <h3 className='footer__title'>У вас возникли вопросы?</h3>
                    <p className='footer__helper footer__form__item'>Заполните форму и мы свяжемся с вами</p>
                    <Form>
                        <Form.Item className='footer__form__item'
                            name='name'
                            rules={[{
                                required: true,
                                message: 'Введите ваше имя'
                            }]}>
                            <Input placeholder='Введите ваше имя' className='footer__input'/>
                        </Form.Item>
                        <Form.Item className='footer__form__item'
                            name='email'
                            rules={[{
                                required: true,
                                message: 'Введите ваш email'
                            }]}>
                            <Input placeholder='Введите ваш email' className='footer__input'/>
                        </Form.Item>
                        <Form.Item className='footer__form__item'>
                            <Button text='Отправить' type='white' className='full-width'/>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user.user,
});

export default connect(mapStateToProps)(Footer);
