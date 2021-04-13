import * as React from 'react';

import { List, message, Typography } from 'antd';
const { Text } = Typography;

import { InviteStatus } from 'Utils/enums';
import { Invite, User } from 'Utils/types';
import InvitesModel from 'Models/InvitesModel';
import InviteAcceptButton from 'Pages/Profile/sections/Personal/sections/Invites/Components/AcceptButton';
import InviteRejectButton from 'Pages/Profile/sections/Personal/sections/Invites/Components/RejectButton';


interface IProps {
    user: User
}

const ProfilePersonalInvites = (props:IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(false);
    const [invites, setInvites] = React.useState([]);
    const [loadings, setLoadings] = React.useState({});

    async function acceptInvite() {
        return;
    }

    async function rejectInvite() {
        return;
    }

    function onClick(key:string, handler:()=>Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    React.useEffect(() => {
        InvitesModel.getInvites()
            .then((invites:Invite[]) => setInvites(invites))
            .catch(e => { message.error(e) })
            .finally(() => setLoading(false));
    }, []);

    function createAction(status:InviteStatus) {
        const actions = [];
        switch (status) {
        case InviteStatus.Pending:
            {
                const key = 'accept'+new Date().toString();
                actions.push(
                    <InviteAcceptButton
                        key={key}
                        loading={loadings[key]}
                        onClick={() => onClick(key, acceptInvite.bind(this, key))}
                    />);
            }
            {
                const key = 'reject'+new Date().toString();
                actions.push(
                    <InviteRejectButton
                        key={key}
                        loading={loadings[key]}
                        onClick={() => onClick(key, rejectInvite.bind(this, key))}
                    />);
            }
            break;
        case InviteStatus.Accepted: actions.push(<Text type='success'>Принято</Text>); break;
        case InviteStatus.Rejected: actions.push(<Text type='secondary'>Отклонено</Text>); break;
        default: actions.push(<></>);
        }
        return actions;
    }

    return (
        <List
            loading={loading}
            style={{ margin: 10 }}
            itemLayout="horizontal"
            dataSource={invites}
            locale={{ emptyText:'Нет приглашений' }}
            renderItem={item => (
                <List.Item
                    style={{ paddingLeft: 10 }}
                    className={'row'}
                    actions={createAction(item.status)}
                >
                    <List.Item.Meta
                        title={'От кого-то'}
                        description={'Вам выслали приглашение'}
                    />
                </List.Item>
            )}
        />
    );
};

export default ProfilePersonalInvites;
