import './style.scss';
import * as React from 'react';

import {Button, Col, List, Popover} from 'antd';

interface IProps {
    children: React.ReactNode
}

const NotificationsPopover = (props: IProps) => {
    const notificationsMock = [
        {
            title: 'NOTIFICATION 1'
        },
        {
            title: 'NOTIFICATION 2'
        },
        {
            title: 'NOTIFICATION 3'
        },
        {
            title: 'NOTIFICATION 4'
        },
    ];

    return (
        <Popover
            title='Уведомления'
            content={
                <Col>
                    <List
                        size="small"
                        dataSource={notificationsMock}
                        renderItem={item => <List.Item
                            onClick={()=>console.log(item)}
                            className={'notifications_popover__item'}
                        >
                            {item.title}
                        </List.Item>}
                    />
                    <div className={'notifications_popover__controls'}>
                        <Button type='primary'>Всё прочитано</Button>
                        <Button danger>Очистить</Button>
                    </div>
                </Col>
            }
            placement='bottomRight'
            trigger='click'
        >
            {props.children}
        </Popover>
    );
}


export default NotificationsPopover;
