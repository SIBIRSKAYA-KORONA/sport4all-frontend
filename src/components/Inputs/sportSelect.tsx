import * as React from 'react';
import { message, Select } from 'antd';
import { Sport } from 'Utils/types';
import SportModel from 'Models/SportModel';


interface IProps {
    onChange: (values: string[]) => void
}

function SportSelect(props: IProps): JSX.Element {
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

    return (<Select
        mode="multiple"
        allowClear
        style={{ minWidth:150, width:'auto' }}
        placeholder="Все виды спорта"
        onChange={(values) => props.onChange(values)}
        defaultValue={[]}
        loading={loading}
    >
        {sports.map(sport => <Select.Option key={sport.id || sport.name} value={sport.name}>{sport.name}</Select.Option>)}
    </Select>);
}

export default SportSelect;
