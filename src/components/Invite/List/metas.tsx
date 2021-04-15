import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import CONST from 'Constants';
import { Team } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';
import { MetaProps } from 'Components/Invite/List/interface';


export const teamMeta = (t:Team):MetaProps => ({
    avatar: (
        <Link to={CONST.PATHS.teams.id(t.id)}>
            <Avatar src={t.avatar.url}>{lettersForAvatar(t.name)}</Avatar>
        </Link>
    ),
    title: <Link to={CONST.PATHS.teams.id(t.id)}>{t.name}</Link>,
    description: t.about,
});
