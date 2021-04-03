import * as React from 'react';

import { Button, Modal, Input, List } from 'antd';

import { Skill } from 'Utils/types';
import SkillsModel from 'Models/SkillsModel';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';


interface IProps {
    addedSkills: Array<Skill>,
    visible: boolean,
    onOk: (skills: Skill[]) => void,
    onCancel: () => void,
}

const AddSkillsModal = (props:IProps):JSX.Element => {
    const [loadingSkills, setLoadingSkills] = React.useState(false);
    const [loadedSkills, setLoadedSkills] = React.useState<Skill[]>([]);
    const [skillsToAdd, setSkillsToAdd] = React.useState<Skill[]>([]);

    const onSkillsSearch = (searchText) => {
        if (!searchText) return;
        SkillsModel.searchSkills(searchText)
            .then((skills: Skill[]) => setLoadedSkills(skills.filter(skill => !props.addedSkills.find(addedSkill => addedSkill.id === skill.id))))
            .finally(() => setLoadingSkills(false));
    };

    return (
        <Modal
            width='760px'
            title='Добавить навык'
            visible={props.visible}
            okText='Добавить'
            cancelText='Отменить'
            onOk={() => props.onOk(skillsToAdd)}
            onCancel={props.onCancel}
        >
            {skillsToAdd.length > 0 &&
                <List
                    itemLayout="horizontal"
                    dataSource={skillsToAdd}
                    renderItem={skill => (
                        <List.Item
                            actions={[
                                <Button
                                    key={'add' + skill.id}
                                    type="primary"
                                    icon={<MinusOutlined/>}
                                    onClick={() => setSkillsToAdd(prev => prev.filter(s => s.id !== skill.id))}
                                    title='Удалить'
                                />
                            ]}>
                            <List.Item.Meta title={skill.name}/>
                        </List.Item>
                    )}
                />
            }
            <Input.Search
                loading={loadingSkills}
                placeholder={'Введите навык'}
                onSearch={onSkillsSearch}/>

            <List
                itemLayout="horizontal"
                dataSource={loadedSkills}
                renderItem={skill => (
                    <List.Item
                        actions={[
                            <Button
                                key={'add' + skill.id}
                                type="primary"
                                icon={<PlusOutlined/>}
                                onClick={() => setLoadedSkills(prev => [...prev, skill])}
                                title='Добавить'
                            />
                        ]}>
                        <List.Item.Meta title={skill.name}/>
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default AddSkillsModal;
