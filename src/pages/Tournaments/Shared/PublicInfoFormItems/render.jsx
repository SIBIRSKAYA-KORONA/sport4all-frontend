import * as React from 'react';
import {Form, Input, Select} from 'antd';
import CONST from 'Constants';

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
                    <Select.Option value={CONST.TOURNAMENTS.systems.roundRobin}>Круговая</Select.Option>
                    <Select.Option value={CONST.TOURNAMENTS.systems.singleElimination}>Олимпийская</Select.Option>
                    {/*<Select.Option value={CONST.TOURNAMENTS.systems.doubleElimination}>На выбывание</Select.Option>*/}
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
