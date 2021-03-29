import * as React from 'react';

import { Tag } from 'antd';

import { EventStatus } from 'Utils/types';
import { getStatusShortTitle } from 'Utils/structUtils';


interface IProps {
    status: EventStatus
}

function getStatusColor(status:EventStatus):string {
    switch (status) {
    case EventStatus.UnknownEvent: return 'purple';
    case EventStatus.NotStartedEvent: return 'red';
    case EventStatus.RegistrationEvent: return 'orange';
    case EventStatus.InProgressEvent: return 'green';
    case EventStatus.FinishedEvent: return 'cyan';
    }
}

const MeetingStatusTag = (props: IProps): JSX.Element => (
    <Tag color={getStatusColor(props.status)}>{getStatusShortTitle(props.status).toLocaleUpperCase()}</Tag>
)

export default MeetingStatusTag;
