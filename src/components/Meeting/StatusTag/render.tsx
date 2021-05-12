import './style.scss';
import * as React from 'react';

import { EventStatus } from 'Utils/types';
import { getStatusShortTitle } from 'Utils/structUtils';


interface IProps {
    status: EventStatus,
    className?: string,
}

const MeetingStatusTag = (props: IProps): JSX.Element => (
    <span className={`status-tag_${props.status} ${props.className}`}>
        {getStatusShortTitle(props.status).toLocaleUpperCase()}
    </span>
)

export default MeetingStatusTag;
