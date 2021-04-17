import * as React from 'react';

import { Button, List } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { CheckCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { InviteStatus } from 'Utils/enums';
import { Invitable, InviteAction, InviteActions, IProps } from './interface';
import { getText, MapOfTextMeta, texts } from 'Components/Invite/List/ItemActions';


const InviteList = (props:IProps):JSX.Element => {
    const [loadings, setLoadings] = React.useState({});
    const [invited, setInvited] = React.useState<MapOfTextMeta>(parseInvitesToTextMeta());

    function parseInvitesToTextMeta():MapOfTextMeta {
        const check = props.actions && props.actions.some(action => [InviteActions.accept, InviteActions.reject].includes(action.type));
        return props.invites
            ? props.invites.reduce((acc, curr) => ((curr.state === InviteStatus.Pending && check) ? acc : { ...acc, [curr[props.keyToCheck]]:texts[curr.state] }), {})
            : {};
    }

    async function showLoading(key:string, handler:() => Promise<void>) {
        setLoadings(prev => ({ ...prev, [key]:true }));
        return handler().finally(() => setLoadings(prev => ({ ...prev, [key]:false })));
    }

    function afterClickCreator(type:InviteStatus) {
        return function(id:number) {
            setInvited(prev => ({ ...prev, [id]:texts[type] }));
        }
    }

    React.useEffect(() => {
        setInvited(parseInvitesToTextMeta());
    }, [props.items, props.invites]);

    const buttons = {
        [InviteActions.invite]: {
            key:        'invite',
            title:      'Выслать приглашение',
            icon:       <PlusOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: afterClickCreator(InviteStatus.Pending)
        },
        [InviteActions.accept]: {
            key:        'accept',
            title:      'Принять',
            icon:       <CheckCircleOutlined/>,
            otherProps: { type:'primary' as ButtonType },
            afterClick: afterClickCreator(InviteStatus.Accepted)
        },
        [InviteActions.reject]: {
            key:        'reject',
            title:      'Отклонить',
            icon:       <MinusCircleOutlined/>,
            otherProps: { danger:true },
            afterClick: afterClickCreator(InviteStatus.Rejected)
        },
    };

    function getActionCreator(action:InviteAction) {
        const d = buttons[action.type];
        return function actionCreator(item:Invitable) {
            const dd = { ...d, key:d.key+item.id };
            return <Button
                {...dd.otherProps}
                loading={loadings[dd.key]}
                key={dd.key}
                icon={dd.icon}
                onClick={() => showLoading(dd.key, action.handler.bind(null, item))
                    .then(() => dd.afterClick && dd.afterClick(item.id))}
            >{dd.title}</Button>
        }
    }

    const actionCreators = props.actions ? props.actions.map(action => getActionCreator(action)) : [];

    return (props.hideEmpty && !props.loading && props.items?.length === 0
        ? <></>
        : <List
            loading={props.loading}
            style={{ margin: 10 }}
            itemLayout="horizontal"
            dataSource={props.items}
            locale={{ emptyText:props.emptyText }}
            renderItem={item => (<List.Item
                style={{ paddingLeft: 10 }}
                className={'row'}
                actions={invited[item.id]
                    ? [getText(invited[item.id])]
                    : actionCreators.map(ac => ac(item))
                }
            ><List.Item.Meta {...props.meta(item)}/></List.Item>)}
        />
    );
}

export default InviteList;
