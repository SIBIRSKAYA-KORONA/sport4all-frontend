import * as React from 'react';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


interface IProps {
    key: string,
    loading: boolean,
    onClick: (key) => void
}

const InviteAcceptButton = (props:IProps):JSX.Element => {
    return (
        <Button
            type='primary'
            loading={props.loading}
            key={props.key}
            icon={<PlusOutlined/>}
            onClick={() => props.onClick(props.key)}
        >Добавить</Button>
    );
};

export default InviteAcceptButton;
