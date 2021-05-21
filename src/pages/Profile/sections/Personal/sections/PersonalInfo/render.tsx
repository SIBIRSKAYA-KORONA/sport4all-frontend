import * as React from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, message, Upload } from 'antd';

import { User } from 'Utils/types';
import Network from 'Core/network';
import UserModel from 'Models/UserModel';


interface IProps {
    user: User
}

const ProfilePersonalInfo = (props:IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);

    function saveInfo(values) {
        setLoading(true);
        console.log(values);
        setTimeout(() => {
            message.info('Метод не подключен');
            setLoading(false);
        }, 1000);
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (<>{props.user &&
        <Form
            {...layout}
            onFinish={saveInfo}
            initialValues={{...props.user}}
        >
            <Form.Item label='Имя' name='name' rules={[{ required: true, message: 'Иван' }]}>
                <Input/>
            </Form.Item>
            <Form.Item label='Фамилия' name='surname' rules={[{ required: true, message: 'Иванов' }]}>
                <Input/>
            </Form.Item>
            <Form.Item label='Никнейм' name='nickname' rules={[{ required: true, message: 'Введите ваш никнейм' }]}>
                <Input/>
            </Form.Item>
            <Form.Item label='Почта' name='email' rules={[{ required: true, message: 'ivan.ivanov@ivan.ivanov' }]}>
                <Input/>
            </Form.Item>
            <Form.Item label='О себе' name='about'
                rules={[{ message: 'Заслуженный тренер РФ и Олимпийский чемпион по литрболу' }]}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item label='Фотография' name='avatar'>
                <Upload
                    fileList={[]}
                    showUploadList={false}
                    customRequest={async (fileData) => {
                        setUploading(true);
                        const formData = new FormData();
                        formData.append('userId', String(props.user.id));
                        formData.append('attach', fileData.file);
                        await Network.uploadFile(formData);
                        await UserModel.getProfile();
                        setUploading(false);
                    }}
                ><Button loading={uploading} icon={<UploadOutlined />}>Загрузить аватар</Button></Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
            </Form.Item>
        </Form>
    }</>);
};

export default ProfilePersonalInfo;
