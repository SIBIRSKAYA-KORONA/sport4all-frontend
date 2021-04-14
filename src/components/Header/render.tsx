import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { BellOutlined } from '@ant-design/icons/lib';
import { Layout, Button, Avatar, Badge } from 'antd';
const AntHeader = Layout.Header;

import CONST from 'Constants';
import logo from '/static/images/logo.svg';
import { Notification } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';
import SearchAll from 'Components/Inputs/searchAll';
import NotificationsModel from 'Models/NotificationsModel'
import { UserAuthenticatedType, UserType } from 'Store/User/UserState';
import NotificationsPopover from 'Components/NotificationsPopover/render';


interface IProps extends RouteComponentProps {
    isAuthenticated: UserAuthenticatedType;
    user: UserType;
    notifications: Notification[];
}

const Header = (props: IProps) => {
    return (
        <AntHeader className='header'>

            <div className={'header__content'}>
                <Link to='/' className={'header__link'}>
                    <img src={logo} className={'header__logo'} alt={'Logo'}/>
                </Link>
                <Link to={CONST.PATHS.feed} className={'header__link'}>Лента</Link>

                <SearchAll {...props}/>

                <div className={'header__side_content'}>
                    {props.isAuthenticated !== null && props.isAuthenticated && props.user
                        ? <>
                            <NotificationsPopover history={props.history}>
                                <div
                                    className={'header__notification_badge_wrapper'}
                                    onClick={() => NotificationsModel.getNotifications()}
                                >
                                    <Badge count={props.notifications.length}>
                                        <BellOutlined className={'header__notification_icon'}/>
                                    </Badge>
                                </div>
                            </NotificationsPopover>
                            <Link to={CONST.PATHS.profile.nickname(props.user.nickname)}>
                                <Avatar size='large' src={props.user.avatar?.url}>
                                    {lettersForAvatar(props.user?.name ? props.user?.name + props.user?.surname : props.user?.nickname)}
                                </Avatar>
                            </Link>
                        </>
                        : <>
                            <Link to={'/signup'}>
                                <Button>Регистрация</Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button type="primary">Вход</Button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </AntHeader>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user,
    notifications: state.notifications.notifications,
});

export default connect(
    mapStateToProps
)(Header);
