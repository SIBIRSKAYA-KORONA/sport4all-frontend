import * as React from 'react';
import {Form, Input, Select} from 'antd';
import PropTypes from 'prop-types'

function PublicInfoFormItemsRender(props) {
    return (
        <>
            <Form.Item
                label="Название турнира"
                name="name"
                rules={[{required: true, message: 'Введите название турнира'}]}
            >
                <Input defaultValue={props.name}/>
            </Form.Item>

            <Form.Item
                label="Описание"
                name="about"
            >
                <Input.TextArea defaultValue={props.description}/>
            </Form.Item>

            <Form.Item
                label="Система турнира"
                name="systemType"
            >
                <Select>
                    <Select.Option value={PublicInfoFormItemsRender.systemTypes[0]}>Круговая</Select.Option>
                    <Select.Option value={PublicInfoFormItemsRender.systemTypes[1]}>Олимпийская</Select.Option>
                    <Select.Option value={PublicInfoFormItemsRender.systemTypes[2]}>На выбывание</Select.Option>
                </Select>
            </Form.Item>


            <Form.Item
                label="Место проведения"
                name="location"
            >
                <Input defaultValue={props.location}/>
            </Form.Item>
        </>
    )
}

PublicInfoFormItemsRender.systemTypes = ['round-robin', 'single-elimination', 'double-elimination']

PublicInfoFormItemsRender.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    systemType: PropTypes.oneOf(PublicInfoFormItemsRender.systemTypes),
    location: PropTypes.string
}

export default PublicInfoFormItemsRender;
