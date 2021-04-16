import * as React from 'react';

import { Button, Col, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Network from 'Core/network';
import { Team, User } from 'Utils/types';


interface IProps {
    team: Team,
    user: User,
    reload: () => void,
}

function TeamSettingsInfoSection(props: IProps):JSX.Element {
    return (<Col>
        <Upload
            showUploadList={false}
            customRequest={async (fileData) => {
                const formData = new FormData();
                formData.append('teamId', String(props.team.id));
                formData.append('attach', fileData.file);
                await Network.uploadFile(formData);
                props.reload();
            }}
        >
            <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
        </Upload>
    </Col>);
}

export default TeamSettingsInfoSection;
