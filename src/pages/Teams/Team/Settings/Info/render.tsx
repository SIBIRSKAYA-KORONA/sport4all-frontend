import * as React from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';

import Network from 'Core/network';
import { Team, User } from 'Utils/types';


interface IProps {
    team: Team,
    user: User,
    reload: () => Promise<void>,
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function TeamSettingsInfoSection(props: IProps):JSX.Element {
    const [loading, setLoading] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);

    async function saveInfo(values) {
        setLoading(true);
        console.log(values);
        setTimeout(() => {
            message.info('Метод не подключен');
            setLoading(false);
        }, 1000);
    }

    return (<Form
        {...layout}
        onFinish={saveInfo}
        initialValues={{...props.team}}
    >
        <Form.Item name='name' label='Название' rules={[{ required: true, }]}>
            <Input/>
        </Form.Item>
        <Form.Item name='about' label='Описание'>
            <Input.TextArea/>
        </Form.Item>
        <Form.Item name='location' label='Место'>
            <Input/>
        </Form.Item>
        <Form.Item label='Фотография' name='avatar'>
            <Upload
                fileList={[]}
                showUploadList={false}
                customRequest={async (fileData) => {
                    const formData = new FormData();
                    formData.append('teamId', String(props.team.id));
                    formData.append('attach', fileData.file);
                    await Network.uploadFile(formData);
                    setUploading(false);
                    await props.reload();
                    setLoading(false);
                }}
            ><Button loading={uploading} icon={<UploadOutlined />}>Загрузить фото</Button></Upload>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
        </Form.Item>
    </Form>);
}

export default TeamSettingsInfoSection;
