import * as React from 'react';

import { Avatar, Button, Col, Divider, Empty, Input, List } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';

import { EventStatus, Team } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';


interface IProps {
    teams: Team[],
    status: EventStatus,
    isSearching: boolean,
    searchResults: any[],
    onTeamAdd: (teamID:number) => Promise<void>,
    onTeamDelete: (teamID:number) => Promise<void>,
    onSearchTeams: (teamName:string) => Promise<any>,
}

function ParticipantsRender(props:IProps):JSX.Element {
    return (props.status >= EventStatus.RegistrationEvent
        ? <Col>
            <Divider orientation={'left'}>Участники</Divider>

            <List
                itemLayout="horizontal"
                dataSource={props.teams}
                renderItem={team => (
                    <List.Item
                        actions={props.status <= EventStatus.RegistrationEvent
                            ? [<Button
                                danger
                                key={'delete' + team.id}
                                icon={<MinusOutlined/>}
                                onClick={() => props.onTeamDelete(team.id)}
                            >Удалить</Button>]
                            : []}>
                        <List.Item.Meta
                            avatar={<Avatar src={team.avatar.url}>{lettersForAvatar(team.name)}</Avatar>}
                            title={team.name}
                            description={team.about}
                        />
                    </List.Item>
                )}
            />
            {props.status <= EventStatus.RegistrationEvent && <>
                <Divider orientation={'left'}>Добавить участника</Divider>

                <Input.Search
                    loading={props.isSearching}
                    placeholder={'Введите название команды'}
                    onSearch={props.onSearchTeams}/>

                <List
                    itemLayout="horizontal"
                    dataSource={props.searchResults}
                    renderItem={team => (
                        <List.Item
                            actions={[
                                <Button
                                    key={'add' + team.id}
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                    onClick={() => props.onTeamAdd(team.id)}
                                >
                                    Добавить
                                </Button>
                            ]}>
                            <List.Item.Meta
                                avatar={<Avatar src={team.avatar.url}>{lettersForAvatar(team.name)}</Avatar>}
                                title={team.name}
                                description={team.about}
                            />
                        </List.Item>
                    )}
                />
            </>}
        </Col>
        : <Empty description={<span>Переведите турнир в состояние &quot;Регистрация&quot;,<br/>чтобы добавить участников</span>}/>
    )
}

export default ParticipantsRender;
