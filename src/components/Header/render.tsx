import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import CONST from 'Constants';
import { getPageName } from 'Utils/utils';
import { UserAuthenticatedType, UserType } from 'Store/User/UserState';
import { ProfileSections } from 'Utils/enums';

const AntHeader = Layout.Header;


interface IProps extends RouteComponentProps {
    isAuthenticated: UserAuthenticatedType,
    user: UserType,
}

const Header = (props: IProps) => {
    const pageName = getPageName();

    return (
        <AntHeader className='header

        '>
            <Menu mode='horizontal' selectedKeys={[pageName]}>
                <Menu.Item key='/'>
                    <Link to='/' className='header__link'>Главная</Link>
                </Menu.Item>

                {props.isAuthenticated !== null && props.isAuthenticated && props.user
                    ? <Menu.Item key='profile main'>
                        <Link to={CONST.PATHS.profile.nickname(props.user.nickname)} className='header__link'>Профиль</Link>
                    </Menu.Item>
                    : <>
                        <Menu.Item key='/signup'>
                            <Link to='/signup' className='header__link'>Регистрация</Link>
                        </Menu.Item>
                        <Menu.Item key='/login'>
                            <Link to='/login' className='header__link'>Войти</Link>
                        </Menu.Item>
                    </>
                }
            </Menu>
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
