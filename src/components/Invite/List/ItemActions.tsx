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
    [key in TextMetas]: TextMeta
}

export enum TextMetas {
    pending = InviteStatus.Pending,
    accepted = InviteStatus.Accepted,
    rejected = InviteStatus.Rejected,
    added = 3
}

const texts:MapOfTextMeta = {
    [TextMetas.pending]: {
        key:        'pending',
        title:      'Ждём ответа',
        type:       'warning' as BaseType,
        icon:       <ClockCircleOutlined/>
    },
    [TextMetas.accepted]: {
        key:        'accepted',
        title:      'Принято',
        type:       'success' as BaseType,
        icon:       <CheckCircleOutlined/>
    },
    [TextMetas.rejected]: {
        key:        'rejected',
        title:      'Отклонено',
        type:       'secondary' as BaseType,
        icon:       <CloseCircleOutlined/>
    },
    [TextMetas.added]: {
        key:        'added',
        title:      'Добавлена',
        type:       'success' as BaseType,
        icon:       <CheckCircleOutlined/>
    }
};
export { texts };

export function getText(meta:TextMeta):JSX.Element {
    return <Text key={meta.key} type={meta.type}>{meta.icon} {meta.title}</Text>;
}
