import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Modal, Input } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import TournamentModel from 'Models/TournamentModel';
import { InviteWithTournament, Tournament } from 'Utils/types';
import TournamentInviteList from 'Components/Invite/TournamentList/render';
import { TournamentInviteListItemAction } from 'Components/Invite/TournamentList/interface';


interface IProps extends RouteComponentProps {
    visible: boolean,
    close: () => void,
    actions?: TournamentInviteListItemAction[],
    invites?: InviteWithTournament[],
    title: string
}

const FindTournamentModal = (props:IProps):JSX.Element => {
    const [isSearching, setIsSearching] = React.useState(false);
    const [tournaments, setTournaments] = React.useState<Tournament[]>([]);

    const debouncedSearch = AwesomeDebouncePromise(TournamentModel.searchTournaments, 500);

    async function handleInputChange(searchText) {
        if (!searchText) return;
        setIsSearching(true);
        return debouncedSearch(searchText, 10)
            .then((tournaments: Tournament[]) => setTournaments(tournaments))
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

            <TournamentInviteList
                {...props}
                hideEmpty
                loading={isSearching}
                invites={props.invites}
                tournaments={tournaments}
                actions={props.actions}
            />
        </Modal>
    );
};

export default FindTournamentModal;
