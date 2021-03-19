import * as React from 'react';
import {Button, Col, Form, Input, List} from 'antd'
import PropTypes from 'prop-types'
import TournamentModel from 'Models/TournamentModel';


function ParticipantsSubsection(props) {
    const addTeam = async (teamId) => {
        await TournamentModel.instance.addTeam(props.tournamentId, teamId);
        console.log('ADDED');
    }

    return (
        <Col>
            <Form
                onFinish={(data) => addTeam(data.teamId)}
                layout={'inline'}>
                <Form.Item
                    label={'teamId'}
                    name={'teamId'}
                    rules={[{required: true, message: 'Введите ID команды'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>


            <List
                itemLayout="horizontal"
                dataSource={props.teams}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.name}
                        />
                    </List.Item>
                )}
            />
        </Col>
    )
}

ParticipantsSubsection.propTypes = {
    tournamentId: PropTypes.number.isRequired,
    teams: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ParticipantsSubsection;
