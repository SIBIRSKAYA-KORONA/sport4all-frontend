import * as React from 'react';

import { message, Select } from 'antd';

import { Sport } from 'Utils/types';
import SportModel from 'Models/SportModel';


interface IProps {
    value: Sport | null,
    onChange: (e) => void
}

const SportSelect = (props: IProps): JSX.Element => {
    const [loading, setLoading] = React.useState(false);
    const [sports, setSports] = React.useState([]);

    React.useEffect(() => {
        function load() {
            setLoading(true);
            SportModel.loadSports()
                .then((sports:Sport[]) => setSports(sports))
                .catch(e => message.error(e))
                .finally(() => setLoading(false));
        }
        load();
    }, []);
    return (<Select loading={loading} value={props.value.name} onChange={(value) => props.onChange(value)}>
        {sports.map(sport => <Select.Option key={sport.name} value={sport.name}>{sport.name}</Select.Option>)}
    </Select>);
}
export default SportSelect;
