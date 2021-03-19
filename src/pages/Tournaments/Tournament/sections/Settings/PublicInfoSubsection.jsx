import * as React from 'react';
import {Button, Form} from 'antd';
import PublicInfoFormItemsRender from 'Pages/Tournaments/Shared/PublicInfoFormItems/render';

const layout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};

function PublicInfoSubsection() {
    return (
        /*TODO: call api*/
        <Form
            {...layout}
            onFinish={() => console.log('SAVE ME')}
        >
            <PublicInfoFormItemsRender />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PublicInfoSubsection;
