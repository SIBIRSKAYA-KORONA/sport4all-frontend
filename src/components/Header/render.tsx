import './style.scss';
import * as React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';

import {Menu, Layout, Input, Button, Avatar, Badge} from 'antd';
import {BellOutlined} from "@ant-design/icons/lib";

const AntHeader = Layout.Header;

import CONST from 'Constants';
import {getPageName} from 'Utils/utils';
import {UserAuthenticatedType, UserType} from 'Store/User/UserState';
import logo from '/static/images/logo.svg'

interface IProps extends RouteComponentProps {
    isAuthenticated: UserAuthenticatedType;
    user: UserType;
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
                            <div className={'header__notification_badge_wrapper'}
                                 onClick={() => console.log('OPEN NOTIFICATIONS MENU')}>
                                <Badge count={4}>
                                    <BellOutlined className={'header__notification_icon'}/>
                                </Badge>
                            </div>
                            <Link to={'/profile'}>
                                <Avatar size='large'/>
                            </Link>
                        </>
                        : <>
                            <Link to={'/signup'}>
                                <Button>Регистрация</Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button>Войти</Button>
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
    user: state.user
});

export default connect(
    mapStateToProps
)(Header);
