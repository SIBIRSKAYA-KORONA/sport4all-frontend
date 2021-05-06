import './style.scss';
import * as React from 'react';

import { MeetingResult } from 'Utils/types';


interface IProps {
    result: MeetingResult,
}

function MeetingResult(props: IProps): JSX.Element {
    return (
        <div className='meeting__result'>
            <span className='meeting__result_left'>{props.result.left}</span>
            <span className='meeting__result_middle'>:</span>
            <span className='meeting__result_right'>{props.result.right}</span>
        </div>
    );
}

export default MeetingResult;
