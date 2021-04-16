import * as React from 'react';

import { Button, Modal, Input } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { Invite } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';
import InviteList from 'Components/Invite/List/render';
import { Invitable, InviteAction, MetaProps } from 'Components/Invite/List/interface';


interface IProps {
    visible: boolean,
    close: () => void,
    actions?: InviteAction[],
    invites?: Invite[],
    title: string,
    keyToCheck: string,
    meta: (item:Invitable) => MetaProps,
    api: (searchText:string, limit:number) => Promise<HttpStatusCode|Invitable[]>
}

const FindSomethingToInvite = (props:IProps):JSX.Element => {
    const [isSearching, setIsSearching] = React.useState(false);
    const [items, setItems] = React.useState<Invitable[]>([]);

    const debouncedSearch = AwesomeDebouncePromise(props.api, 500);

    async function handleInputChange(searchText) {
        if (!searchText) return;
        setIsSearching(true);
        return debouncedSearch(searchText, 10)
            .then((items: Invitable[]) => setItems(items))
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
                placeholder={'Название или имя'}
                onChange={e => handleInputChange(e.target.value)}
            />

            <InviteList
                hideEmpty
                keyToCheck={props.keyToCheck}
                items={items}
                loading={isSearching}
                actions={props.actions}
                meta={props.meta}
            />
        </Modal>
    );
};

export default FindSomethingToInvite;
