import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';

import {Avatar, Col, Row, Tabs, Typography} from 'antd';

import JSIcon from 'Static/icons/js.svg';
import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';
import BasePage from 'Components/BasePage/render';

const {Title, Paragraph} = Typography;
const {TabPane} = Tabs;

const ProfilePageRender = (props) => (<>
    <Header/>
    <BasePage>
        <>{!props.loggedIn && <h1 className='login__header'>Not authorized</h1>}</>
        {props.user &&
            <Row>
                <Col flex='100px'>
                    <Avatar size='large' icon={JSIcon}/>
                </Col>
                <Col flex='auto'>
                    <Title className='profile__name'>{props.user.name} {props.user.surname}</Title>
                    <p className='profile__nickname'>@{props.user.nickname}</p>
                    <Paragraph className='profile__about'>{props.user.about}</Paragraph>
                </Col>
            </Row>
        }
        <Row>
            <Tabs>
                <TabPane tab='История' key={1}>
                    <></>
                </TabPane>
                <TabPane tab='Команды' key={2}>
                    <></>
                </TabPane>
                <TabPane tab='Турниры' key={3}>
                    <></>
                </TabPane>
            </Tabs>
        </Row>
    </BasePage>
    <Footer />
</>);

ProfilePageRender.propTypes = {
    user: propTypes.object,
    loggedIn: propTypes.bool,
    nickname: propTypes.string,
};

export default ProfilePageRender;
