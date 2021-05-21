import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { Avatar, Col, message, Row, Tabs, Typography } from 'antd';
const { Title, Paragraph } = Typography;

import store from 'Store/store';
import { Team } from 'Utils/types';
import TeamModel from 'Models/TeamModel';
import { URL_PARAMS, PATHS } from 'Constants';
import { lettersForAvatar } from 'Utils/utils';
import { UserType } from 'Store/User/UserState';
import BasePage from 'Components/BasePage/render';
import { addRecentTeam } from 'Store/Recent/RecentActions';
import TeamPlayersSection from 'Pages/Teams/Team/Players/render';
import { TeamSections, TeamSettingsSections } from 'Utils/enums';
import TeamSettingsSection from 'Pages/Teams/Team/Settings/render';


interface IProps extends RouteComponentProps {
    user: UserType
}

const TeamPage = (props: IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(true);
    const [team, setTeam] = React.useState<Team>(null);
    const [canEdit, setCanEdit] = React.useState(false);

    async function reload() {
        setLoading(true);
        return TeamModel.loadTeam(props.match.params[URL_PARAMS.team.id])
            .then((team:Team) => setTeam(team))
            .catch(e => { message.error(e.toString()) })
            .finally(() => setLoading(false));
    }

    React.useEffect(() => { reload() }, [props.match.params[URL_PARAMS.team.id]]);
    React.useEffect(() => {
        setCanEdit(props.user && team && props.user.id === team.ownerId);
        store.dispatch(addRecentTeam(team));
    }, [props.user, team]);

    function redirect(key:TeamSections) {
        props.history.push(key === TeamSections.Settings
            ? PATHS.teams.settings.section(team.id, TeamSettingsSections.Info)
            : PATHS.teams.id(team.id)
        )
    }

    return (
        <BasePage {...props} loading={loading}>{team && <>
            <Row>
                <Col flex='100px'>
                    <Avatar size={90} src={team.avatar.url}>{lettersForAvatar(team.name)}</Avatar>
                </Col>
                <Col flex='auto'>
                    <Title level={2}>{team.name}</Title>
                    {team.about && <Paragraph>{team.about}</Paragraph>}
                    {team.location && <Paragraph>{team.location}</Paragraph>}
                </Col>
            </Row>
            <Tabs
                activeKey={props.match.params[URL_PARAMS.team.section]}
                defaultActiveKey={TeamSections.Players}
                onChange={redirect}
                className='full-width'
            >
                <Tabs.TabPane tab='Игроки' key={TeamSections.Players}>
                    <TeamPlayersSection
                        {...props}
                        team={team}
                        reload={reload}
                        canEdit={canEdit}
                    />
                </Tabs.TabPane>
                {canEdit &&
                    <Tabs.TabPane tab='Настройки' key={TeamSections.Settings}>
                        <TeamSettingsSection reload={reload} team={team} user={props.user} {...props}/>
                    </Tabs.TabPane>
                }
            </Tabs>
        </>}</BasePage>
    )
}

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps)(TeamPage);
