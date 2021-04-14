import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Modal, Input, message } from 'antd';

import TeamModel from 'Models/TeamModel';
import { Team, User } from 'Utils/types';
import InvitesModel from 'Models/InvitesModel';
import TeamList from 'Components/Teams/List/render';
import { TeamListItemActions } from 'Components/Teams/List/interface';


interface IProps extends RouteComponentProps {
    visible: boolean,
    close: () => void,
    user: User
}

const FindTeamModal = (props:IProps):JSX.Element => {
    const [isSearching, setIsSearching] = React.useState(false);
    const [teams, setTeams] = React.useState<Team[]>([]);

    async function onSearchTeams(searchText) {
        if (!searchText) return;
        setIsSearching(true);
        return TeamModel.instance.searchTeams(searchText, 10)
            .then((teams: Team[]) => setTeams(teams))
            .finally(() => setIsSearching(false));
    }

    async function onSendInvite(team:Team) {
        return InvitesModel.fromPlayerToTeam(team, props.user)
            .then(() => { message.success('Приглашение выслано') })
            .catch(e => { message.error(e.toString()); });
    }

    return (
        <Modal
            width='760px'
            title='Вступить в команду'
            visible={props.visible}
            destroyOnClose
            footer={<Button type='primary' onClick={props.close}>Готово</Button>}
        >
            <Input.Search
                loading={isSearching}
                placeholder={'Введите название команды'}
                onSearch={onSearchTeams}/>

            <TeamList
                {...props}
                hideEmpty
                loading={isSearching}
                teams={teams}
                actions={[{
                    type:       TeamListItemActions.sendInvite,
                    handler:    onSendInvite
                }]}
            />
        </Modal>
    );
};

export default FindTeamModal;
