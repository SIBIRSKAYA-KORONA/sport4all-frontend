import * as React from 'react';

import { Button, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';

import { IAvatar } from 'Utils/types';
import Network from 'Core/network';

interface IProps {
    meetingId: number,
    attachments?: Array<IAvatar>,
    reload: () => void
}

function MeetingPictureWall(props: IProps): JSX.Element {
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [loading, setLoading] = React.useState(false);

    const handleChange = ({ fileList }) => setFileList(fileList);
    const handleSubmit = () => {
        setLoading(true);

        const list = [];
        fileList.forEach(file => {
            const formData = new FormData();
            formData.append('meetingId', String(props.meetingId));
            formData.append('attach', file.originFileObj);
            list.push(Network.uploadFile(formData));
        });
        Promise.all(list)
            .then(() => message.success('Файлы загружены'))
            .then(() => setFileList([]))
            .then(() => props.reload());
        setLoading(false);
    };
    return (<>
        <Upload
            listType='picture-card'
            fileList={fileList}
            onChange={handleChange}
            multiple
        >
            <>
                <PlusOutlined/>
                <div style={{ marginTop:8 }}>Загрузить</div>
            </>
        </Upload>
        <Button onClick={handleSubmit} type='primary' loading={loading}>Сохранить</Button>
    </>);
}

export default MeetingPictureWall;
