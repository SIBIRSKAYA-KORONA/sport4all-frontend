import * as React from 'react';
import {Form, Input, Select} from 'antd';


function PublicInfoFormItemsRender() {
    return (
        <>
            <Form.Item
                label="Название турнира"
                name="name"
                rules={[{required: true, message: 'Введите название турнира'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Описание"
                name="about"
            >
                <Input.TextArea/>
            </Form.Item>

            <Form.Item
                label="Система турнира"
                name="systemType"
            >
                <Select>
                    <Select.Option value="round-robin">Круговая</Select.Option>
                    <Select.Option value="single-elimination">Олимпийская</Select.Option>
                    <Select.Option value="double-elimination">На выбывание</Select.Option>
                </Select>
            </Form.Item>


            <Form.Item
                label="Место проведения"
                name="location"
            >
                <Input/>
            </Form.Item>
        </>
    )
}

export default PublicInfoFormItemsRender;
