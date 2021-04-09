import * as React from 'react';

import {Form, Input, Select, message} from 'antd';

import CONST from 'Constants';
import SportModel from 'Models/SportModel';


function PublicInfoFormItemsRender() {
    const [sports, setSports] = React.useState([]);
    React.useEffect(() => {
        function load() {
            SportModel.loadSports()
                .then(sports => setSports(sports))
                .catch(e => message.error(e));
        }
        load();
    }, []);

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
                label="Вид спорта"
                name="sport"
            >
                <Select>
                    {sports.map(sport => <Select.Option key={sport.name} value={sport.name}>{sport.name}</Select.Option>)}
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
