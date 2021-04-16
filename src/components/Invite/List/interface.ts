import React from 'react';
import { Invite } from 'Utils/types';

export enum InviteActions {
    accept,
    reject,
    invite,
}

export type Invitable = any;

export type InviteActionHandler = (item:Invitable) => Promise<void>;

export interface InviteAction {
    type: InviteActions,
    handler: InviteActionHandler,
}

export interface MetaProps {
    avatar: React.ReactNode,
    title: React.ReactNode,
    description: React.ReactNode,
}

export interface IProps {
    items: Invitable[],
    invites?: Invite[],
    keyToCheck: string,
    loading: boolean,
    emptyText?: string,
    hideEmpty?: boolean,
    actions: InviteAction[] | null,
    meta: (item:Invitable) => MetaProps,
}
