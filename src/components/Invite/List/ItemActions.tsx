import * as React from 'react';
import { BaseType } from 'antd/lib/typography/Base';
import { TeamPlayerListItemTexts } from 'Components/Teams/PlayersList/interface';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
const { Text } = Typography;

export type MapOfTextMeta = {
    [key: number]: TextMeta
}

const texts:MapOfTextMeta = {
    [TeamPlayerListItemTexts.pending]: {
        key:        'pending',
        title:      'Ждём ответа',
        type:       'warning' as BaseType,
        icon:       <ClockCircleOutlined/>
    },
    [TeamPlayerListItemTexts.accepted]: {
        key:        'accepted',
        title:      'Принято',
        type:       'success' as BaseType,
        icon:       <CheckCircleOutlined/>
    },
    [TeamPlayerListItemTexts.rejected]: {
        key:        'rejected',
        title:      'Отклонено',
        type:       'secondary' as BaseType,
        icon:       <CloseCircleOutlined/>
    },
};
export { texts };

export interface TextMeta {
    key: string,
    type: BaseType,
    title: string,
    icon: any
}

export function getText(meta:TextMeta):JSX.Element {
    return <Text key={meta.key} type={meta.type}>{meta.icon} {meta.title}</Text>;
}
