import React, { useEffect, useState } from 'react';

import {Button, Modal, Table} from 'antd';
import { RowSelectionType } from 'antd/lib/table/interface';

import { Team } from 'Utils/types';
import TournamentModel from 'Models/TournamentModel';


type IProps = {
    tournamentId: typeof TournamentModel.id,
    visible: boolean,
    onOk: (teams) => void,
    onCancel: () => void,
}

interface DataType {
    key: React.Key;
    name: string;
}

interface TableTeam extends Team {
    key: string
}

function AddTeamsModal(props: IProps): JSX.Element {
    const [teams, setTeams] = useState<Array<TableTeam>>([]);
    const [selectedTeamIds, setSelectedTeamIds] = useState<Array<number>>([]);
    useEffect(() => {
        const load = () => {
            TournamentModel.getTeams(props.tournamentId)
                .then(teams => { setTeams(teams.map(team => ({ ...team, key: team.id }) )); })
                .catch(e => { console.error(e); });
        };
        load();
    }, []);
    const rowSelection = {
        type: 'checkbox' as RowSelectionType,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setSelectedTeamIds(selectedRows.map(row => +row.key));
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: !selectedTeamIds.includes(+record.key) && selectedTeamIds.length >= 2,
            name: record.name,
        }),
    };

    const onOK = () => {
        if (selectedTeamIds.length !== 2) return;
        props.onOk(selectedTeamIds);
    };

    return (
        <Modal
            title='Выберите команды'
            visible={props.visible}
            footer={[
                <Button key="back" onClick={props.onCancel}>Назад</Button>,
                <Button key='submit' type='primary' disabled={selectedTeamIds.length !== 2} onClick={onOK}>Добавить</Button>
            ]}
        >
            <Table
                rowSelection={rowSelection}
                dataSource={teams}
                columns={[{ title: 'Название', dataIndex: 'name' }]}
                pagination={false}
            />
        </Modal>
    )
}

export default AddTeamsModal;
