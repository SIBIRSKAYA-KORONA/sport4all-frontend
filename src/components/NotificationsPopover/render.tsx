import './style.scss';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Col, List, Popover, Spin } from 'antd';
import { Notification } from 'Utils/types';
import NotificationsModel from 'Models/NotificationsModel'
import { UserType } from "Store/User/UserState";

interface IProps {
    user: UserType,
    children: React.ReactNode,
    notifications: Notification[],
    isLoading: boolean,
    history: RouteComponentProps['history']
}


const NotificationsPopover = (props: IProps) => {
    const [parsedNotifications, setParsedNotifications] = useState([]);

    // TODO: not enough time to understand typescript
    // @ts-ignore
    useEffect(async () => {
        const newParsedNotifications = [];

        for (const notification of props.notifications) {
            const parsedNotification = NotificationsModel.parseNotification(notification);

            newParsedNotifications.push(parsedNotification);
        }

        setParsedNotifications(newParsedNotifications);
    }, [props.notifications])

    return (
        <Popover
            title='Уведомления'
            content={
                <Col>
                    {props.isLoading ?
                        <>
                            <Spin/>

                            <div className={'notifications_popover__controls'}>
                                <Button type='primary' disabled>Всё прочитано</Button>
                                <Button danger disabled>Очистить</Button>
                            </div>
                        </>
                        :
                        <>
                            <List
                                size='small'
                                dataSource={parsedNotifications}
                                locale={{emptyText: 'Кажется, тут ничего нет'}}
                                renderItem={notification => <List.Item
                                    onClick={() => {
                                        if (notification.href !== null) {
                                            props.history.push(notification.href)
                                        }
                                    }}
                                    className={'notifications_popover__item'}
                                >
                                    <List.Item.Meta
                                        title={notification.title}
                                        description={notification.description}
                                    />
                                </List.Item>}
                            />

                            <div className={'notifications_popover__controls'}>
                                <Button type='primary' disabled onClick={() => NotificationsModel.markNotificationsAsRead()}>Всё
                                    прочитано</Button>
                                <Button danger onClick={() => NotificationsModel.deleteNotifications()}>Очистить</Button>
                            </div>
                        </>
                    }
                </Col>
            }
            placement='bottomRight'
            trigger='click'
        >
            {props.children}
        </Popover>
    );
}

const mapStateToProps = state => ({
    user: state.user.user,
    notifications: state.notifications.notifications,
    isLoading: state.notifications.isLoading
});

export default connect(mapStateToProps)(NotificationsPopover);
