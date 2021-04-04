import './style.scss';
import * as React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';

import {Avatar, Badge, Button, Input, Layout} from 'antd';
import {BellOutlined} from "@ant-design/icons/lib";
import {Notification} from "Utils/types";
import {getPageName, lettersForAvatar} from 'Utils/utils';
import {UserAuthenticatedType, UserType} from 'Store/User/UserState';
import logo from '/static/images/logo.svg'
import NotificationsPopover from "Components/NotificationsPopover/render";
import NotificationsModel from 'Models/NotificationsModel'

const AntHeader = Layout.Header;

interface IProps extends RouteComponentProps {
    isAuthenticated: UserAuthenticatedType;
    user: UserType;
    notifications: Notification[];
    history: RouteComponentProps['history'];
}

const Header = (props: IProps) => {
    const pageName = getPageName();

    return (
        <AntHeader className='header'>

            <div className={'header__content'}>
                <Link to='/' className={'header__link'}>
                    <img src={logo} className={'header__logo'} alt={'Logo'}/>
                </Link>

                <Input.Search disabled className={'header__search'}/>

                <div className={'header__side_content'}>
                    {props.isAuthenticated !== null && props.isAuthenticated
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
                            <Link to={'/profile'}>
                                <Avatar size='large'>
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
