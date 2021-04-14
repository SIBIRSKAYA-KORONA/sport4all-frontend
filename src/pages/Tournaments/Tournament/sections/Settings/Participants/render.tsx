import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Col, Divider, Empty, Space } from 'antd';

import { EventStatus, Team, Tournament } from 'Utils/types';
import TeamList from 'Components/Teams/List/render';
import { TeamListItemActions } from 'Components/Teams/List/interface';
import FindTeamModal from 'Components/Teams/FindTeamModal/FindTeamModal';
import InvitesModel from 'Models/InvitesModel';


interface IProps extends RouteComponentProps {
    tournament: Tournament,
    isSearching: boolean,
    searchResults: any[],
    onTeamAdd: (team: Team) => Promise<void>,
    onTeamDelete: (team: Team) => Promise<void>,
    onSearchTeams: (teamName: string) => Promise<any>,
}

// todo: add canEdit
function ParticipantsRender(props:IProps):JSX.Element {
    const [modalVisible, setModalVisible] = React.useState(false);

    async function onTeamInvite(team:Team):Promise<void> {
        return InvitesModel.fromTournamentToTeam(props.tournament, team).then(() => void 0);
    }

    return (props.tournament.status >= EventStatus.RegistrationEvent
        ? <Col>
            <Divider orientation={'left'}>
                <Space direction='horizontal' size='small' align='baseline'>
                    <h4>Участники</h4>
                    {props.tournament.status <= EventStatus.RegistrationEvent && <>
                        <Button type='link' onClick={() => setModalVisible(true)}>Пригласить</Button>
                        <FindTeamModal
                            {...props}
                            visible={modalVisible}
                            close={() => setModalVisible(false)}
                            actions={[{
                                type:       TeamListItemActions.sendInvite,
                                handler:    onTeamInvite
                            }]}
                        />
                    </>}
                </Space>
            </Divider>

            <TeamList
                {...props}
                loading={false}
                teams={props.tournament.teams}
                actions={props.tournament.status <= EventStatus.RegistrationEvent && [{
                    type:       TeamListItemActions.delete,
                    handler:    props.onTeamDelete
                }]}
            />
        </Col>
        : <Empty description={<span>Переведите турнир в состояние &quot;Регистрация&quot;,<br/>чтобы добавить участников</span>}/>
    )
}

export default ParticipantsRender;
