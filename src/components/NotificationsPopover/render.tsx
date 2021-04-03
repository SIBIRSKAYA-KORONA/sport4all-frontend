import './style.scss';
import {connect} from 'react-redux';
import NotificationsModel from 'Models/NotificationsModel'
import * as React from 'react';

import {Button, Col, List, Popover, Spin} from 'antd';
import {Notification} from "Utils/types";


interface IProps {
    children: React.ReactNode,
    notifications: Notification[],
    isLoading: boolean,
}

const NotificationsPopover = (props: IProps) => {
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
                                size="small"
                                dataSource={props.notifications}
                                locale={{emptyText: 'Кажется, тут ничего нет'}}
                                renderItem={item => <List.Item
                                    onClick={() => console.log(item)}
                                    className={'notifications_popover__item'}
                                >
                                    {item.type}
                                </List.Item>}
                            />

                            <div className={'notifications_popover__controls'}>
                                <Button type='primary' onClick={()=>NotificationsModel.markAsRead()}>Всё прочитано</Button>
                                <Button danger onClick={()=>NotificationsModel.deleteNotifications()}>Очистить</Button>
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
