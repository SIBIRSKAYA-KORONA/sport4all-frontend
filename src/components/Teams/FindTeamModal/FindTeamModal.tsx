import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Modal, Input } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import TeamModel from 'Models/TeamModel';
import { Invite, Team } from 'Utils/types';
import InviteList from 'Components/Invite/List/render';
import { teamMeta } from 'Components/Invite/List/metas';
import { InviteAction } from 'Components/Invite/List/interface';


interface IProps extends RouteComponentProps {
    visible: boolean,
    close: () => void,
    actions?: InviteAction[],
    invites?: Invite[],
    title: string
}

const FindTeamModal = (props:IProps):JSX.Element => {
    const [isSearching, setIsSearching] = React.useState(false);
    const [teams, setTeams] = React.useState<Team[]>([]);

    const debouncedSearch = AwesomeDebouncePromise(TeamModel.searchTeams, 500);

    async function handleInputChange(searchText) {
        if (!searchText) return;
        setIsSearching(true);
        return debouncedSearch(searchText, 10)
            .then((teams: Team[]) => setTeams(teams))
            .finally(() => setIsSearching(false));
    }

    return (
        <Modal
            width='760px'
            title={props.title}
            visible={props.visible}
            destroyOnClose
            onCancel={props.close}
            footer={<Button type='primary' onClick={props.close}>Готово</Button>}
        >
            <Input.Search
                loading={isSearching}
                placeholder={'Введите название команды'}
                onChange={e => handleInputChange(e.target.value)}
            />

            <InviteList
                hideEmpty
                keyToCheck='invited_id'
                items={teams}
                loading={isSearching}
                actions={props.actions}
                meta={teamMeta}
            />
        </Modal>
    );
};

export default FindTeamModal;
