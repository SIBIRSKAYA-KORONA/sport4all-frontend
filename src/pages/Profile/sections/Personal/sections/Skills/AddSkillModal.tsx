import * as React from 'react';

import { Button, Modal, Input, List } from 'antd';

import { Skill } from 'Utils/types';
import SkillsModel from 'Models/SkillsModel';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import AwesomeDebouncePromise from 'awesome-debounce-promise';


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

    const debouncedSearch = AwesomeDebouncePromise(SkillsModel.searchSkills, 500);

    function handleSearch(text) {
        setSearchText(text);
        if (!text) {
            setLoadedSkills([]);
            return;
        }
        setLoadingSkills(true);
        debouncedSearch(text)
            .then((skills: Skill[]) => {
                setLoadedSkills(skills && skills.length > 0
                    ? skills.filter(skill => !props.addedSkills.find(addedSkill => addedSkill.id === skill.id))
                    : [{ id:0, name:text, approvals:[] }]
                );
            })
            .finally(() => setLoadingSkills(false));
    }

    const onSkillAdd = (skill:Skill) => {
        setSkillsToAdd(prev => [...prev, skill]);
        setLoadedSkills(prev => prev.filter(p => p.id !== skill.id))
    };

    const onCancel = () => {
        setLoadedSkills([]);
        setSearchText('');
        setSkillsToAdd([]);
        props.onCancel();
    };

    return (
        <Modal
            width='760px'
            title='Добавить навык'
            visible={props.visible}
            okText='Добавить'
            cancelText='Отменить'
            onOk={() => props.onOk(skillsToAdd)}
            onCancel={onCancel}
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
                placeholder={'Введите название навыка'}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
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
