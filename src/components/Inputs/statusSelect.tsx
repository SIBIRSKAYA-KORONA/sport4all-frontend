import * as React from 'react';
import { Select } from 'antd';
import { EventStatus } from 'Utils/types';
import { allEventStatuses, getStatusShortTitle } from 'Utils/structUtils';


interface IProps {
    onChange: (values: EventStatus[]) => void
}

function StatusSelect(props: IProps): JSX.Element {
    return (<Select
        mode="multiple"
        allowClear
        style={{ minWidth:150, width:'auto' }}
        placeholder="Все статусы"
        onChange={(values) => props.onChange(values)}
        defaultValue={[]}
    >
        {allEventStatuses(false).map(stat => (<Select.Option key={stat} value={stat} style={{ height:'auto' }}>
            {getStatusShortTitle(stat)}
        </Select.Option>))}
    </Select>);
}

export default StatusSelect;
