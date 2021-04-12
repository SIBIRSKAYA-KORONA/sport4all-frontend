import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Col, Divider, Empty, Input } from 'antd';

import { EventStatus, Team } from 'Utils/types';
import TeamList from 'Components/Teams/List/render';
import { TeamListItemAction } from 'Components/Teams/List/interface';


interface IProps extends RouteComponentProps {
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

            <TeamList
                {...props}
                loading={false}
                teams={props.teams}
                action={{
                    type:TeamListItemAction.delete,
                    handler:(teamID) => props.onTeamDelete(teamID)
                }}
            />

            {props.status <= EventStatus.RegistrationEvent && <>
                <Divider orientation={'left'}>Добавить участника</Divider>

                <Input.Search
                    loading={props.isSearching}
                    placeholder={'Введите название команды'}
                    onSearch={props.onSearchTeams}/>

                <TeamList
                    {...props}
                    loading={props.isSearching}
                    teams={props.searchResults}
                    action={{
                        type:TeamListItemAction.add,
                        handler:(teamID) => props.onTeamAdd(teamID)
                    }}
                />
            </>}
        </Col>
        : <Empty description={<span>Переведите турнир в состояние &quot;Регистрация&quot;,<br/>чтобы добавить участников</span>}/>
    )
}

export default ParticipantsRender;
