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
    const [searchText, setSearchText] = React.useState('');

    const onSkillsSearch = (searchText) => {
        if (!searchText) return;
        setLoadingSkills(true);
        SkillsModel.searchSkills(searchText)
            .then((skills: Skill[]) => {
                if (skills && skills.length > 0) {
                    setLoadedSkills(skills.filter(skill => !props.addedSkills.find(addedSkill => addedSkill.id === skill.id)))
                } else {
                    setLoadedSkills([{ id:0, name:searchText, approved:[] }]);
                }
            })
            .finally(() => setLoadingSkills(false));
    };

    const onSkillAdd = (skill:Skill) => {
        setSkillsToAdd(prev => [...prev, skill]);
        setLoadedSkills(prev => prev.filter(p => p.id !== skill.id))
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
            destroyOnClose={true}
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
                                >Удалить</Button>
                            ]}>
                            <List.Item.Meta title={skill.name}/>
                        </List.Item>
                    )}
                />
            }
            <Input.Search
                loading={loadingSkills}
                placeholder={'Введите навык'}
                onSearch={onSkillsSearch}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            {loadedSkills && loadedSkills.length > 0 &&
                <List
                    itemLayout="horizontal"
                    dataSource={loadedSkills}
                    renderItem={skill => (
                        <List.Item
                            actions={skill.id === 0
                                ? [<Button
                                    key={'create' + skill.id}
                                    type='dashed'
                                    icon={<PlusOutlined/>}
                                    onClick={() => onSkillAdd(skill)}
                                >Создать</Button>]
                                : [<Button
                                    key={'add' + skill.id}
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                    onClick={() => onSkillAdd(skill)}
                                >Добавить</Button>]
                            }>
                            <List.Item.Meta title={skill.name}/>
                        </List.Item>
                    )}
                />
            }
        </Modal>
    );
};

export default AddSkillsModal;
