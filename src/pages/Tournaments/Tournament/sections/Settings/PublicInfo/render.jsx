import * as React from 'react';
import {Button, Form, Select} from 'antd';
import PublicInfoFormItemsRender from 'Pages/Tournaments/Shared/PublicInfoFormItems/render';
import PropTypes from 'prop-types'

const layout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};

function PublicInfoRender(props) {
    return (
        /*TODO: call api*/
        <Form
            {...layout}
            onFinish={props.onSubmit}
            initialValues={{
                name: props.tournamentData.name,
                about: props.tournamentData.about,
                systemType: props.tournamentData.system,
                location: props.tournamentData.location,
                status: props.tournamentData.status,
            }}
        >
            <PublicInfoFormItemsRender/>

            <Form.Item
                label="Статус"
                name="status"
            >
                <Select>
                    <Select.Option value={1}>{PublicInfoRender.statuses[1]}</Select.Option>
                    <Select.Option value={2}>{PublicInfoRender.statuses[2]}</Select.Option>
                    <Select.Option value={3}>{PublicInfoRender.statuses[3]}</Select.Option>
                    <Select.Option value={4}>{PublicInfoRender.statuses[4]}</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    )
}

PublicInfoRender.propTypes = {
    tournamentData: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
}

PublicInfoRender.statuses = {
    1: 'Не начался',
    2: 'Регистрация',
    3: 'Идёт',
    4: 'Завершился',
}

export default PublicInfoRender;
