import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { message, List, Space, Row, Col, Typography } from 'antd';
const { Title } = Typography;

import { Skill, User } from 'Utils/types';
import SkillsModel from 'Models/SkillsModel';
import HttpStatusCode from 'Utils/httpErrors';
import ProfileModel from 'Models/ProfileModel';
import { PlusCircleOutlined } from '@ant-design/icons';
import SkillListItem from 'Components/Skill/ListItem/render';
import AddSkillsModal from 'Pages/Profile/sections/Settings/sections/Skills/AddSkillModal';


interface IProps extends RouteComponentProps {
    user: User,
    profile: User,
    canEdit: boolean
}

const ProfileSettingsSkills = (props:IProps):JSX.Element => {
    const [skills, setSkills] = React.useState<Skill[]>([]);
    const [modalVisible, setModalVisible] = React.useState(false);

    async function loadSkills() {
        ProfileModel.loadSkills(props.profile.id)
            .then((skills:Skill[]) => {
                for (const skill of skills) {
                    skill.approvals = Array.isArray(skill.approvals)
                        ? skill.approvals.filter(appr => appr.fromUser.id !== props.profile.id)
                        : skill.approvals = [];
                }
                setSkills(skills);
            })
            .catch(e => {
                if (isNaN(+e)) {
                    if (e !== 404) message.error(HttpStatusCode[e] || e.toString());
                }
                else message.error('Не удалось загрузить навыки');
            });
    }

    React.useEffect(() => {
        if (props.profile) loadSkills();
    }, [props.match.params['id']]);

    function addSkills(skillsToAdd: Skill[]) {
        const arr = [];
        for (const skill of skillsToAdd) {
            if (skill.id === 0) {
                if (props.canEdit) arr.push(SkillsModel.createSkill(props.user.id, skill.name));
            } else {
                arr.push(SkillsModel.approveSkill(props.profile.id, skill.id));
            }
        }
        Promise.all(arr).finally(() => loadSkills());
    }

    return (<div style={{ width:'100%' }}>{props.profile &&
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
                renderItem={item => (<SkillListItem userId={props.user.id} reloadSkills={loadSkills} canEdit={props.canEdit} profile={props.profile} skill={item} {...props}/>)}
            />
        </Space>
    }</div>);
};

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps)(ProfileSettingsSkills);
