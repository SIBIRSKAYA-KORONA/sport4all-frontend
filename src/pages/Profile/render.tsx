import * as React from 'react';
import { connect } from 'react-redux';
import './style.scss';

import {Avatar, Col, Row, Tabs, Typography} from 'antd';

import JSIcon from 'Static/icons/js.svg';
import BasePage from 'Components/BasePage/render';
import TeamList from 'Components/Teams/List/render';
import {RouteComponentProps} from 'react-router-dom';
import {User} from 'Utils/types';
import {UserAuthenticatedType} from 'Store/User/UserState';

const {Title, Paragraph} = Typography;
const {TabPane} = Tabs;

interface IProps extends RouteComponentProps {
    user: User,
    isAuthenticated: UserAuthenticatedType
}

const ProfilePageRender = (props:IProps):JSX.Element => (
    <BasePage>
        {props.user &&
            <Row>
                <Col flex='100px'>
                    <Avatar size='large' icon={<img src={JSIcon}  alt={JSIcon}/>}/>
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
                    <TeamList {...props} />
                </TabPane>
                <TabPane tab='Турниры' key={3}>
                    <></>
                </TabPane>
            </Tabs>
        </Row>
    </BasePage>
);

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(ProfilePageRender);
