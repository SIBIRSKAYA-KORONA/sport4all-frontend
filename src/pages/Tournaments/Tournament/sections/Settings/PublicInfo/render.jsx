import * as React from 'react';
import {Button, Form} from 'antd';
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
            }}
        >
            <PublicInfoFormItemsRender/>
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

export default PublicInfoRender;
