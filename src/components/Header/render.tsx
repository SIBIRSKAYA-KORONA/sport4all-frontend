import './style.scss';
import * as React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';

import {Layout, Input, Button, Avatar, Badge} from 'antd';
import {BellOutlined} from '@ant-design/icons/lib';

import CONST from 'Constants';
import logo from '/static/images/logo.svg'
import { getPageName, lettersForAvatar } from 'Utils/utils';
import { UserAuthenticatedType, UserType } from 'Store/User/UserState';

const AntHeader = Layout.Header;


interface IProps extends RouteComponentProps {
    isAuthenticated: UserAuthenticatedType,
    user: UserType,
}

const Header = (props: IProps) => {
    const pageName = getPageName();

    return (
        <AntHeader className='header'>

            <div className={'header__content'}>
                <Link to='/' className={'header__link'}>
                    <img src={logo} className={'header__logo'} alt={'Logo'}/>
                </Link>
                <Link to={CONST.PATHS.feed} className={'header__link'}>Лента</Link>

                <Input.Search disabled className={'header__search'}/>

                <div className={'header__side_content'}>
                    {props.isAuthenticated !== null && props.isAuthenticated && props.user
                        ? <>
                            <div className={'header__notification_badge_wrapper'}
                                 onClick={() => console.log('OPEN NOTIFICATIONS MENU')}>
                                <Badge>
                                    <BellOutlined className={'header__notification_icon'}/>
                                </Badge>
                            </div>
                            <Link to={CONST.PATHS.profile.nickname(props.user.nickname)}>
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
});

export default connect(
    mapStateToProps
)(Header);
