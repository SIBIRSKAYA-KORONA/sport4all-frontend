import './style.scss';
import * as React from 'react';

import { message, List, Space, Row, Col, Typography } from 'antd';
const { Title } = Typography;

import { Skill, User } from 'Utils/types';
import SkillsModel from 'Models/SkillsModel';
import HttpStatusCode from 'Utils/httpErrors';
import ProfileModel from 'Models/ProfileModel';
import { PlusCircleOutlined } from '@ant-design/icons';
import SkillListItem from 'Components/Skill/ListItem/render';
import AddSkillsModal from 'Pages/Profile/sections/Settings/sections/Skills/AddSkillModal';


interface IProps {
    user: User,
    canEdit: boolean
}

const ProfileSettingsSkills = (props:IProps):JSX.Element => {
    const [skills, setSkills] = React.useState<Skill[]>([]);
    const [modalVisible, setModalVisible] = React.useState(false);

    const loadSkills = () => {
        ProfileModel.loadSkills(props.user.id)
            .then(skills => setSkills(skills as Array<Skill>))
            .catch(e => {
                if (isNaN(+e)) {
                    if (e !== 404) message.error(HttpStatusCode[e]);
                }
                else message.error('Не удалось загрузить навыки');
            });
    };

    React.useEffect(() => {
        if (props.user) loadSkills();
    }, []);

    const addSkills = (skillsToAdd: Skill[]) => {
        const arr = [];
        for (const skill of skillsToAdd) {
            if (skill.id === 0) {
                arr.push(SkillsModel.createSkill(props.user.id, skill.name));
            } else {
                arr.push(SkillsModel.approveSkill(props.user.id, skill.id));
            }
        }
        Promise.all(arr).finally(() => loadSkills());
    };

    return (<div style={{ width:'100%' }}>{props.user &&
        <Space direction='vertical' size='middle' style={{ width:'100%' }}>
            <Row>
                <Col span={12}>
                    <Title level={3}>Навыки</Title>
                </Col>
                {props.canEdit &&
                    <Col span={12} className='skills__buttons'>
                        <PlusCircleOutlined
                            size={256}
                            onClick={() => setModalVisible(true)}
                        />
                        <AddSkillsModal
                            addedSkills={skills}
                            visible={modalVisible}
                            onOk={(skills) => {
                                addSkills(skills);
                                setModalVisible(false);
                            }}
                            onCancel={() => setModalVisible(false)}
                        />
                    </Col>
                }
            </Row>
            <List
                itemLayout="horizontal"
                dataSource={skills}
                renderItem={item => (<SkillListItem canEdit={props.canEdit} pid={props.user.id} skill={item}/>)}
            />
        </Space>
    }</div>);
};

export default ProfileSettingsSkills;
