import * as React from 'react';

import {Button, Col, Form} from 'antd';
import BasePage from 'Components/BasePage/render';
import PropTypes from 'prop-types'
import PublicInfoFormItemsRender from 'Pages/Tournaments/Shared/PublicInfoFormItems/render';

const formColLayout = {
    offset: 6,
    span: 24 - 6 * 2
}

const layout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};

const tailLayout = {
    wrapperCol: { offset: 10 },
};

function TournamentCreatePageRender(props) {
    return (
        <BasePage {...props}>
            <Col {...formColLayout}>
                <Form
                    {...layout}
                    onFinish={props.onSubmit}
                >
                    <PublicInfoFormItemsRender onSubmit={props.onSubmit}/>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </BasePage>
    )
}

TournamentCreatePageRender.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default TournamentCreatePageRender;
