import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Col, Divider, Empty, Input } from 'antd';

import { EventStatus, Team } from 'Utils/types';
import TeamList from 'Components/Teams/List/render';
import { TeamListItemActions } from 'Components/Teams/List/interface';


interface IProps extends RouteComponentProps {
    teams: Team[],
    status: EventStatus,
    isSearching: boolean,
    searchResults: any[],
    onTeamAdd: (team:Team) => Promise<void>,
    onTeamDelete: (team:Team) => Promise<void>,
    onSearchTeams: (teamName:string) => Promise<any>,
}

// todo: add canEdit
function ParticipantsRender(props:IProps):JSX.Element {
    return (props.status >= EventStatus.RegistrationEvent
        ? <Col>
            <Divider orientation={'left'}>Участники</Divider>

            <TeamList
                {...props}
                loading={false}
                teams={props.teams}
                actions={props.status <= EventStatus.RegistrationEvent && [{
                    type:       TeamListItemActions.delete,
                    handler:    props.onTeamDelete
                }]}
            />

            {props.status <= EventStatus.RegistrationEvent && <>
                <Divider orientation={'left'}>Добавить участника</Divider>

                <Input.Search
                    loading={props.isSearching}
                    placeholder={'Введите название команды'}
                    onSearch={props.onSearchTeams}/>

                <TeamList
                    {...props}
                    hideEmpty={true}
                    loading={props.isSearching}
                    teams={props.searchResults}
                    actions={[{
                        type:       TeamListItemActions.add,
                        handler:    props.onTeamAdd
                    }]}
                />
            </>}
        </Col>
        : <Empty description={<span>Переведите турнир в состояние &quot;Регистрация&quot;,<br/>чтобы добавить участников</span>}/>
    )
}

export default ParticipantsRender;
