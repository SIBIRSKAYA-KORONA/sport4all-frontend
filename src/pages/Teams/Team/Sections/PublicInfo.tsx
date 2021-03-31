import * as React from 'react';

import { Button, Col, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Network from 'Core/network';


interface IProps {
    teamId: number,
    reload: () => void
}

function TeamPublicInfo(props: IProps):JSX.Element {
    return (<Col>
        <Upload
            showUploadList={false}
            customRequest={async (fileData) => {
                const formData = new FormData();
                formData.append('teamId', String(props.teamId));
                formData.append('attach', fileData.file);
                await Network.uploadFile(formData);
                props.reload();
            }}
        >
            <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
        </Upload>
    </Col>);
}

export default TeamPublicInfo;
