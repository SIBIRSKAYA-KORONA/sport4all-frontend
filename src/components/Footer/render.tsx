import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';

import { Link } from 'react-router-dom';
import Button from 'Components/Button/render';
import Input from 'Components/Inputs/input';

function Footer() {
    return (
        <div className='footer'>
            <div className="footer__container">
                <section className='footer__item'></section>
                <section className='footer__item'>
                    <h3 className='footer__title'>У вас возникли вопросы?</h3>
                    <p className='footer__helper'>Заполните форму и мы свяжемся с вами</p>
                    <Form>
                        <Form.Item
                            name='name'
                            rules={[{
                                required: true,
                                message: 'Введите ваше имя'
                            }]}>
                            <Input placeholder='Введите ваше имя' className='footer__input'/>
                        </Form.Item>
                        <Form.Item
                            name='email'
                            rules={[{
                                required: true,
                                message: 'Введите ваш email'
                            }]}>
                            <Input placeholder='Введите ваш email' className='footer__input'/>
                        </Form.Item>
                        <Form.Item>
                            <Button text='Отправить' type='white' className='full-width'/>
                        </Form.Item>
                    </Form>
                </section>
                <section className='footer__item'></section>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user.user,
});

export default connect(mapStateToProps)(Footer);
