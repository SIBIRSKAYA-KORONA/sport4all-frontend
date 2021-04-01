import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Space } from 'antd';

import UserModel from 'Models/UserModel';


const ProfileSettingsActions = (props:RouteComponentProps):JSX.Element => {
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

    const actions = [
        {
            title: 'Выйти',
            handler: logout,
            loading: logoutLoading,
        }
    ];

    return (<Space direction='vertical' size='middle'>
        {actions.map((action, index) =>
            <Button key={index} type='primary' onClick={action.handler} loading={action.loading}>{action.title}</Button>
        )}
    </Space>);
};

export default ProfileSettingsActions;
