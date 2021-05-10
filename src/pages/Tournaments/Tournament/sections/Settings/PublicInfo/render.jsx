import * as React from 'react';
import {Avatar, Button, Col, Divider, Form, Row, Steps, Upload} from 'antd';
import PublicInfoFormItemsRender from 'Pages/Tournaments/Shared/PublicInfoFormItems/render';
import PropTypes from 'prop-types'
import {TournamentStatus} from 'Utils/enums';
import './style.scss'

const layout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};

function PublicInfoRender(props) {
    return (
        <Row justify={'space-between'}>
            <Col>
                <Form
                    {...layout}
                    onFinish={props.onSubmit}
                    initialValues={{
                        name: props.tournamentData.name,
                        about: props.tournamentData.about,
                        systemType: props.tournamentData.system,
                        location: props.tournamentData.location,
                        sport: props.tournamentData.sport
                    }}
                >
                    <PublicInfoFormItemsRender/>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={ props.tournamentData.status !== TournamentStatus.NotStarted }>
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>

                <Divider/>

                <Col>
                    <Steps direction="vertical" current={props.tournamentData.status - 1}>
                        <Steps.Step title={'Не начался'}/>
                        <Steps.Step title={'Регистрация'}/>
                        <Steps.Step title={'Идёт'}/>
                        <Steps.Step title={'Завершился'}/>
                    </Steps>
                    <Button
                        type={'primary'}
                        onClick={props.setNextStatus}
                        disabled={props.tournamentData.status === TournamentStatus.Ended}
                    >
                        Следующий этап
                    </Button>
                </Col>
            </Col>


            <Upload
                className={ 'public_info__avatar_upload' }
                listType="picture-card"
                showUploadList={false}
                customRequest={props.onAvatarChanged}
            >
                <Avatar style={{ width: '100%', height: '100%' }} src={props.tournamentData.avatar.url}/>
            </Upload>
        </Row>
    )
}

PublicInfoRender.propTypes = {
    tournamentData: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onAvatarChanged: PropTypes.func.isRequired,
    setNextStatus: PropTypes.func.isRequired,
}


export default PublicInfoRender;
