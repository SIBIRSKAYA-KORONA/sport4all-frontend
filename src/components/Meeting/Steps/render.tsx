import * as React from 'react';

import { Steps } from 'antd';
const { Step } = Steps;

import { EventStatus } from 'Utils/types';


interface IProps {
    current: EventStatus
}

function MeetingSteps(props: IProps): JSX.Element {
    const steps = [
        { key:EventStatus.UnknownEvent, title:'Создан' },
        { key:EventStatus.NotStartedEvent, title:'Не начат' },
        { key:EventStatus.RegistrationEvent, title:'Регистрация' },
        { key:EventStatus.InProgressEvent, title:'Матч идёт!' },
        { key:EventStatus.FinishedEvent, title:'Матч завершён' },
    ];
    return (
        <Steps current={props.current}>
            {steps.map(step => <Step key={step.key} title={step.title} /> )}
        </Steps>
    )
}

export default MeetingSteps;
