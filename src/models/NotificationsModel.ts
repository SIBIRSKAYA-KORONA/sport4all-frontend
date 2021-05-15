import Network from 'Core/network';
import {BadRequestError, NotAuthorizedError, ServerError} from 'Utils/errors';
import store from 'Store/store';
import {deleteNotifications, markAsRead, setNotifications, addNotification} from 'Store/Notifications/NotificationsActions';
import {message, notification} from 'antd';
import {
    InviteStatus,
    Notifications,
    ProfilePersonalSections,
    TeamSections,
    TeamSettingsSections,
    TournamentSettingsSection
} from 'Utils/enums';
import {Notification, User} from 'Utils/types';
import {PATHS} from 'Constants';

interface IParsedNotification {
    title: string,
    description: string,
    imageSrc: string,
    href: string | null
}

class NotificationsModel {
    static socket;
    static pingInterval;

    static parseNotification(notification: Notification): IParsedNotification {
        const parsedNotification: IParsedNotification = {
            title: '',
            description: '',
            imageSrc: '',
            href: null,
        };
        parsedNotification.description = new Date(notification.createAt * 1000).toLocaleString('ru-RU');
        const user = store.getState().user.user;

        switch (notification.type) {
        case Notifications.addedToTeam:
            parsedNotification.title = 'Вас добавили в команду';
            parsedNotification.href = PATHS.teams.id(notification.team_id);
            break;

        case Notifications.tournamentStarted:
            parsedNotification.title = 'Турнир начался'
            parsedNotification.href = PATHS.tournaments.id(notification.tournament_id);
            break;

        case Notifications.tournamentFinished:
            parsedNotification.title = 'Турнир завершился';
            parsedNotification.href = PATHS.tournaments.id(notification.tournament_id);
            break;

        case Notifications.meetingStarted:
            parsedNotification.title = 'Матч начался';
            parsedNotification.href = PATHS.meetings.id(notification.meeting_id);
            break;

        case Notifications.meetingFinished:
            parsedNotification.title = 'Матч завершился';
            parsedNotification.href = PATHS.meetings.id(notification.meeting_id);
            break;


        case Notifications.teamDirectInviteCreated:
            parsedNotification.title = 'Вас пригласили в команду';
            parsedNotification.href = PATHS.profile.personal.section(user.nickname, ProfilePersonalSections.Invites);
            break;

        case Notifications.teamDirectInviteUpdated:
            switch (notification.invite_state) {
            case InviteStatus.Accepted:
                parsedNotification.title = 'Игрок принял ваше приглашение в команду';
                break;
            case InviteStatus.Rejected:
                parsedNotification.title = 'Игрок отклонил ваше приглашение в команду';
                break;
            default:
                parsedNotification.title = 'Игрок ответил на ваше приглашение в команду';
                break;
            }
            parsedNotification.href = PATHS.teams.section(notification.team_id, TeamSections.Players);
            break;

        case Notifications.teamIndirectInviteCreated:
            parsedNotification.title = 'Игрок хочет вступить в вашу команду';
            parsedNotification.href = PATHS.teams.settings.section(notification.team_id, TeamSettingsSections.Invites);
            break;

        case Notifications.teamIndirectInviteUpdated:
            switch (notification.invite_state) {
            case InviteStatus.Accepted:
                parsedNotification.title = 'Вашу заявку на вступление в команду приняли';
                break;
            case InviteStatus.Rejected:
                parsedNotification.title = 'Вашу заявку на вступление в команду отклонили';
                break;
            default:
                parsedNotification.title = 'Вашу заявку на вступление в команду рассмотрели';
                break;
            }
            parsedNotification.href = PATHS.teams.section(notification.team_id, TeamSections.Players);
            break;


        case Notifications.tournamentDirectInviteCreated:
            parsedNotification.title = 'Вашу команду пригласили принять участие в турнире';
            parsedNotification.href = PATHS.teams.settings.section(notification.team_id, TeamSettingsSections.Invites);
            break;

        case Notifications.tournamentDirectInviteUpdated:
            switch (notification.invite_state) {
            case InviteStatus.Accepted:
                parsedNotification.title = 'Команда приняла ваше приглашение на участие в турнире';
                break;
            case InviteStatus.Rejected:
                parsedNotification.title = 'Команда отклонила ваше приглашение на участие в турнире';
                break;
            default:
                parsedNotification.title = 'Команда ответила на ваше приглашение на участие в турнире';
                break;
            }
            parsedNotification.href = PATHS.tournaments.settings.section(notification.tournament_id, TournamentSettingsSection.Members);
            break;

        case Notifications.tournamentIndirectInviteCreated:
            parsedNotification.title = 'Команда хочет принять участие в вашем турнире';
            parsedNotification.href = PATHS.tournaments.settings.section(notification.tournament_id, TournamentSettingsSection.Invites);
            break;

        case Notifications.tournamentIndirectInviteUpdated:
            switch (notification.invite_state) {
            case InviteStatus.Accepted:
                parsedNotification.title = 'Вашу заявку на участие в турнире приняли';
                break;
            case InviteStatus.Rejected:
                parsedNotification.title = 'Вашу заявку на участие в турнире отклонили';
                break;
            default:
                parsedNotification.title = 'Вашу заявку на участие в турнире рассмотрели';
                break;
            }
            parsedNotification.href = PATHS.tournaments.id(notification.tournament_id);
            break;

        case Notifications.skillWasApproved:
            parsedNotification.title = 'Кто-то подтвердил один из ваших навыков';
            parsedNotification.href = `/profile/${user.nickname}/personal/skills`
            break;

        default:
            parsedNotification.title = 'Неизвестное уведомление';
        }

        return parsedNotification;
    }

    static openWebSocket() {
        this.closeWebSocket();

        try {
            this.socket = new WebSocket('wss://sport4all.tech/api/ws');

            this.socket.onopen= ()=> {
                this.pingInterval = setInterval(() => this.socket.send(''), 10*1000)
            };
            this.socket.onmessage = (event) => {
                const rawNotification: Notification = JSON.parse(event.data);
                store.dispatch(addNotification(rawNotification));

                const parsedNotification = this.parseNotification(rawNotification);
                notification.open({
                    message: parsedNotification.title,
                    placement: 'bottomRight',
                    duration: 4
                });
            };

        } catch (e) {
            console.error(e)
        }
    }

    static closeWebSocket() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    static async getNotifications() {
        return Network.fetchGet(Network.paths.notifications)
            .then(async res => {
                switch (res.status) {
                case 200: {
                    const notifications = await res.json();
                    store.dispatch(setNotifications(notifications));
                    break;
                }
                case 400: throw BadRequestError;
                case 401: throw NotAuthorizedError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                message.error('Не удалось получить уведомления');
                console.error(error);
                throw Error(error);
            });
    }

    static async markNotificationsAsRead() {
        console.log('IMPLEMENT ME');
        store.dispatch(markAsRead());
    }

    static async deleteNotifications() {
        return Network.fetchDelete(Network.paths.notifications, {})
            .then(async res => {
                switch (res.status) {
                case 200:
                    store.dispatch(deleteNotifications());
                    break;
                case 400: throw BadRequestError;
                case 401: throw NotAuthorizedError;
                default: throw ServerError;
                }
            })
            .catch(error => {
                message.error('Не удалось очистить уведомления');
                console.error(error);
                throw Error(error);
            });
    }

}

export default NotificationsModel;
