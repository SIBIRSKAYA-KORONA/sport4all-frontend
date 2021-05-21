import * as React from 'react';
import { Steps } from 'antd';
const { Step } = Steps;
import { EventStatus } from 'Utils/types';


interface IProps {
    current: EventStatus
}

// we intentionally did not include UnknownEvent and NotStartedEvent
// but for steps to render correctly we have to remember that
const STEPS_OFFSET = 2;

function MeetingSteps(props: IProps): JSX.Element {
    const steps = [
        { key:EventStatus.RegistrationEvent, title:'Регистрация' },
        { key:EventStatus.InProgressEvent, title:'Матч идёт!' },
        { key:EventStatus.FinishedEvent, title:'Матч завершён' },
    ];
    return (
        <Steps direction='vertical' current={props.current-STEPS_OFFSET} status={props.current === EventStatus.FinishedEvent ? 'finish' : 'process'}>
            {steps.map(step => <Step key={step.key} title={step.title} /> )}
        </Steps>
    );
}

export default MeetingSteps;
