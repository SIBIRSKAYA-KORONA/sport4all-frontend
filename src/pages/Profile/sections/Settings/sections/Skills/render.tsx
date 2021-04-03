import * as React from 'react';

import { message, List, Space, Row, Col, Typography } from 'antd';
const { Title } = Typography;

import { Skill, User } from 'Utils/types';
import ProfileModel from 'Models/ProfileModel';
import UserModel from 'Models/UserModel';
import HttpStatusCode from 'Utils/httpErrors';
import { PlusCircleOutlined } from '@ant-design/icons';
import SkillListItem from 'Components/Skill/ListItem/render';
import AddSkillsModal from 'Pages/Profile/sections/Settings/sections/Skills/AddSkillModal';
import SkillsModel from 'Models/SkillsModel';


interface IProps {
    user: User
}

const ProfileSettingsSkills = (props:IProps):JSX.Element => {
    const [skills, setSkills] = React.useState<Skill[]>([]);
    const [modalVisible, setModalVisible] = React.useState(false);

    const loadSkills = () => {
        ProfileModel.loadSkills(props.user.id)
            .then(skills => setSkills(skills as Array<Skill>))
            .catch(e => {
                console.error(e);
                if (isNaN(+e)) message.error(HttpStatusCode[e]);
                else message.error('Не удалось загрузить навыки');
            });
    };

    React.useEffect(() => {
        if (props.user) loadSkills();
    }, []);

    const addSkills = (skills: Skill[]) => {
        SkillsModel.addSkills(props.user.id, skills)
            .then(() => loadSkills());
    };

    return (<div style={{ width:'100%' }}>{props.user &&
        <Space direction='vertical' size='middle'>
            <Row>
                <Col span={12}>
                    <Title>Навыки</Title>
                </Col>
                <Col span={12} className='skills__buttons'>
                    <PlusCircleOutlined />
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
            </Row>
            <List
                itemLayout="horizontal"
                dataSource={skills}
                renderItem={item => (<SkillListItem skill={item}/>)}
            />
        </Space>
    }</div>);
};

export default ProfileSettingsSkills;
