import * as React from 'react';

import Footer from 'Components/Footer/render';
import {Button, Col, Form, Input, Select} from 'antd';
import BasePage from 'Components/BasePage/render';
import PropTypes from 'prop-types'

const formColLayout = {
    offset: 6,
    span: 24 - 6 * 2
}

const layout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};

function TournamentCreatePageRender(props) {
    return (
        <BasePage>
            <Col {...formColLayout}>
                <Form
                    {...layout}
                    onFinish={props.onSubmit}
                >
                    <Form.Item
                        label="Название турнира"
                        name="tournamentName"
                        rules={[{required: true, message: 'Введите название турнира'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Вид спорта"
                        name="sportType"
                        rules={[{required: true, message: 'Выберите вид спорта'}]}
                    >
                        <Select>
                            <Select.Option value="football">Футбол</Select.Option>
                            <Select.Option value="basketball">Баскетбол</Select.Option>
                            <Select.Option value="swimming">Плавание</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Система турнира"
                        name="tournamentSystem"
                    >
                        <Select>
                            <Select.Option value="round-robin">Круговая</Select.Option>
                            <Select.Option value="single-elimination">Олимпийская</Select.Option>
                            <Select.Option value="double-elimination">На выбывание</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                    </Form.Item>

                </Form>
            </Col>
            <Footer/>

        </BasePage>
    )
}

TournamentCreatePageRender.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default TournamentCreatePageRender;
