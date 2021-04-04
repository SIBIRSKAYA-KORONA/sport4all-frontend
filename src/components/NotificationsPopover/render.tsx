import './style.scss';
import {connect} from 'react-redux';
import NotificationsModel from 'Models/NotificationsModel'
import Network from '../../core/network';
import { RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import {useEffect, useState} from 'react';

import {Button, Col, List, Popover, Spin} from 'antd';
import {Notification} from 'Utils/types';

interface IProps {
    children: React.ReactNode,
    notifications: Notification[],
    isLoading: boolean,
    history: RouteComponentProps['history']
}

interface IParsedNotification {
    title: string,
    description: string,
    imageSrc: string,
    href: string | null
}


const NotificationsPopover = (props: IProps) => {
    const [parsedNotifications, setParsedNotifications] = useState([]);

    // TODO: not enough time to understand typescript
    // @ts-ignore
    useEffect(async () => {
        const newParsedNotifications = [];

        for (const notification of props.notifications) {
            const parsedNotification: IParsedNotification = {
                title: '',
                description: '',
                imageSrc: '',
                href: null,
            };
            parsedNotification.description = new Date(notification.createAt * 1000).toLocaleString('ru-RU');

            switch (notification.type) {
                case 'added_to_team':
                    parsedNotification.title = `Вас добавили в команду`;
                    parsedNotification.href = `${Network.paths.teams}/${notification.team_id}`;
                    break;

                case 'tournament_started':
                    parsedNotification.title = 'Турнир начался'
                    parsedNotification.href = `${Network.paths.tournaments}/${notification.tournament_id}`;
                    break;

                case 'tournament_finished':
                    parsedNotification.title = 'Турнир завершился';
                    parsedNotification.href = `${Network.paths.tournaments}/${notification.tournament_id}`;
                    break;

                case 'meeting_started':
                    parsedNotification.title = 'Матч начался';
                    parsedNotification.href = `${Network.paths.meetings.id(notification.meeting_id)}`;
                    break;

                case 'meeting_finished':
                    parsedNotification.title = 'Матч завершился';
                    parsedNotification.href = `${Network.paths.meetings.id(notification.meeting_id)}`;
                    break;

                default:
                    parsedNotification.title = 'Неизвестное уведомление';
            }

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
                                <Button type='primary' disabled onClick={() => NotificationsModel.markAsRead()}>Всё
                                    прочитано</Button>
                                <Button danger
                                        onClick={() => NotificationsModel.deleteNotifications()}>Очистить</Button>
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
    notifications: state.notifications.notifications,
    isLoading: state.notifications.isLoading
});

export default connect(mapStateToProps)(NotificationsPopover);
