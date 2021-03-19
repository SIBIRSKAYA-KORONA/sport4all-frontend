import * as React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux';

import { IUserState } from 'Store/User/UserState';
import { getPageName } from 'Utils/utils';

interface IProps {
    isAuthenticated: boolean | null;
}

const Header = (props: IProps) => {
    const pageName = getPageName();
    return (
        <div className='header'>
            <Menu className='header__list' mode='horizontal' selectedKeys={[pageName]}>
                <Menu.Item key='/'>
                    <Link to='/' className='header__link'>Главная</Link>
                </Menu.Item>
                <Menu.Item key='/teams'>
                    <Link to='/teams' className='header__link'>Команды</Link>
                </Menu.Item>

                {props.isAuthenticated !== null && props.isAuthenticated
                    ? <>
                        <Menu.SubMenu key='/profile'>
                            <Menu.Item key='profile main'>
                                <Link to='/profile' className='header__link'>Профиль</Link>
                            </Menu.Item>
                            <Menu.Item key='profile logout'>
                                <Link to='/logout' className='header__link'>Выйти</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </>
                    : <>
                        <Menu.Item key='/signup'>
                            <Link to='/signup' className='header__link'>Sign Up</Link>
                        </Menu.Item>
                        <Menu.Item key='/login'>
                            <Link to='/login' className='header__link'>Login</Link>
                        </Menu.Item>
                    </>
                }
            </Menu>
        </div>
    );
}

const mapStateToProps = (state: IUserState) => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(
    mapStateToProps
)(Header);
