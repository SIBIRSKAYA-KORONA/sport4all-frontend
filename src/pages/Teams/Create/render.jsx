import * as React from 'react';
import propTypes from 'prop-types';
import './style.scss';
import {Form, Input, Button} from 'antd';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';
import BasePage from 'Components/BasePage/render';

function TeamCreatePageRender(props) {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return (<>
        <Header/>
        <BasePage>
            <div className='create-team'>
                <h1>Создайте свою команду</h1>
                <Form {...layout} onFinish={props.onSubmit}>
                    <Form.Item name='name' label='Название' rules={[{ required: true, }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='about' label='Описание'>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item name='location' label='Место'>
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Создать</Button>
                    </Form.Item>
                </Form>
            </div>
        </BasePage>
        <Footer />
    </>);
}

TeamCreatePageRender.propTypes = {
    onSubmit: propTypes.func.isRequired,
};

export default TeamCreatePageRender;
