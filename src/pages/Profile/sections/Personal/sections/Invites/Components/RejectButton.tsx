import * as React from 'react';

import { Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';


interface IProps {
    key: string,
    loading: boolean,
    onClick: () => void
}

const InviteRejectButton = (props:IProps):JSX.Element => {
    return (
        <Button
            danger
            loading={props.loading}
            key={props.key}
            icon={<MinusOutlined/>}
            onClick={() => props.onClick()}
        >Добавить</Button>
    );
};

export default InviteRejectButton;
