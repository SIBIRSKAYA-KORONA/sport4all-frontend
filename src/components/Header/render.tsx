import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Menu, Layout, Button } from 'antd';
const AntHeader = Layout.Header;

import UserModel from 'Models/UserModel';
import { getPageName } from 'Utils/utils';
import { UserAuthenticatedType } from 'Store/User/UserState';


interface IProps extends RouteComponentProps {
    isAuthenticated: UserAuthenticatedType;
}

const Header = (props: IProps) => {
    const pageName = getPageName();
    const [logoutLoading, setLogoutLoading] = React.useState(false);
    const logout = () => {
        setLogoutLoading(true);
        UserModel.logout()
            .then(() => { props.history.push('/'); })
            .catch(e => {
                console.error(e);
                setLogoutLoading(false);
            });
    };
    return (
        <AntHeader className='header'>
            <Menu className='header__list' mode='horizontal' selectedKeys={[pageName]}>
                <Menu.Item key='/'>
                    <Link to='/' className='header__link'>Главная</Link>
                </Menu.Item>

                {props.isAuthenticated !== null && props.isAuthenticated
                    ? <>
                        <Menu.SubMenu key='/profile' title='Профиль'>
                            <Menu.Item key='profile main'>
                                <Link to='/profile' className='header__link'>Профиль</Link>
                            </Menu.Item>
                            <Menu.Item key='profile logout'>
                                <Button type='link' onClick={logout} loading={logoutLoading}>Выйти</Button>
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
        </AntHeader>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(
    mapStateToProps
)(Header);
