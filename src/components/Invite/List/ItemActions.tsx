import * as React from 'react';
import { BaseType } from 'antd/lib/typography/Base';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { InviteStatus } from 'Utils/enums';
const { Text } = Typography;


export interface TextMeta {
    key: string,
    type: BaseType,
    title: string,
    icon: any
}

export type MapOfTextMeta = {
    [key: number]: TextMeta
}

const texts:MapOfTextMeta = {
    [InviteStatus.Pending]: {
        key:        'pending',
        title:      'Ждём ответа',
        type:       'warning' as BaseType,
        icon:       <ClockCircleOutlined/>
    },
    [InviteStatus.Accepted]: {
        key:        'accepted',
        title:      'Принято',
        type:       'success' as BaseType,
        icon:       <CheckCircleOutlined/>
    },
    [InviteStatus.Rejected]: {
        key:        'rejected',
        title:      'Отклонено',
        type:       'secondary' as BaseType,
        icon:       <CloseCircleOutlined/>
    },
};
export { texts };

export function getText(meta:TextMeta):JSX.Element {
    return <Text key={meta.key} type={meta.type}>{meta.icon} {meta.title}</Text>;
}
