import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import { PATHS } from 'Constants';
import { Team, Tournament, User } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';
import { MetaProps } from 'Components/Invite/List/interface';
import { lettersForUserAvatar } from 'Utils/structUtils';


export const teamMeta = (t:Team):MetaProps => ({
    avatar: (
        <Link to={PATHS.teams.id(t.id)}>
            <Avatar src={t.avatar.url}>{lettersForAvatar(t.name)}</Avatar>
        </Link>
    ),
    title: <Link to={PATHS.teams.id(t.id)}>{t.name}</Link>,
    description: t.about,
});

export const tournamentMeta = (t:Tournament):MetaProps => ({
    avatar: (
        <Link to={PATHS.tournaments.id(t.id)}>
            <Avatar src={t.avatar.url}>{lettersForAvatar(t.name)}</Avatar>
        </Link>
    ),
    title: <Link to={PATHS.tournaments.id(t.id)}>{t.name}</Link>,
    description: t.about,
});

export const userMeta = (u:User):MetaProps => ({
    avatar: (
        <Link to={PATHS.profile.nickname(u.nickname)}>
            <Avatar src={u.avatar.url}>{lettersForUserAvatar(u)}</Avatar>
        </Link>
    ),
    title: <Link to={PATHS.profile.nickname(u.nickname)}>{`${u.name} ${u.surname}`}</Link>,
    description: '@'+u.nickname,
});
