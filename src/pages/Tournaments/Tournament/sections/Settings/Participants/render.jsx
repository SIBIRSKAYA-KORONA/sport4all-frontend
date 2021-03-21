import * as React from 'react';
import {Avatar, Button, Col, Divider, Input, List} from 'antd';
import PropTypes from 'prop-types'
import {MinusOutlined, PlusOutlined} from '@ant-design/icons/lib/icons';


function ParticipantsRender(props) {
    return (
        <Col>
            <Divider orientation={'left'}>Участники</Divider>


            <List
                itemLayout="horizontal"
                dataSource={props.teams}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button
                                danger
                                icon={<MinusOutlined/>}
                                onClick={() => props.onTeamDelete(item.id)}
                            >
                                Удалить
                            </Button>
                        ]}>
                        <List.Item.Meta
                            avatar={<Avatar/>}
                            title={item.name}
                            description={item.about}
                        />
                    </List.Item>
                )}
            />

            <Divider orientation={'left'}>Добавить участника</Divider>


            <Input.Search
                loading={props.isSearching}
                placeholder={'Введите название команды'}
                onSearch={props.onSearchTeams}/>

            <List
                itemLayout="horizontal"
                dataSource={props.searchResults}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button
                                type="primary"
                                icon={<PlusOutlined/>}
                                onClick={() => props.onTeamAdd(item.id)}
                            >
                                Добавить
                            </Button>
                        ]}>
                        <List.Item.Meta
                            avatar={<Avatar/>}
                            title={item.name}
                            description={item.about}
                        />
                    </List.Item>
                )}
            />

        </Col>
    )
}

ParticipantsRender.propTypes = {
    teams: PropTypes.array.isRequired,
    isSearching: PropTypes.bool.isRequired,
    searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
    onTeamAdd: PropTypes.func.isRequired,
    onTeamDelete: PropTypes.func.isRequired,
    onSearchTeams: PropTypes.func.isRequired,
}

export default ParticipantsRender;
