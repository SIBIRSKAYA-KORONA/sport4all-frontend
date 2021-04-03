import Network from '../core/network';
import {BadRequestError, NotAuthorizedError, ServerError} from 'Utils/errors';
import store from 'Store/store';
import {deleteNotifications, markAsRead, setNotifications} from 'Store/Notifications/NotificationsActions';

class NotificationsModel {
    static socket;
    static pingInterval;

    static openWebSocket() {
        this.closeWebSocket();

        try {
            this.socket = new WebSocket('wss://sport4all.tech/api/ws');

            this.socket.onopen= ()=> {
                this.pingInterval = setInterval(() => this.socket.send(''), 10*1000)
            };
            this.socket.onmessage = (event) => {
                console.log(event.data);
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
                // TODO: debug
                const mock = [
                    {message_type: 'some_message1',time:'11:11:11', isRead: false},
                    {message_type: 'some_message2',time:'11:11:11', isRead: false},
                    {message_type: 'some_message3',time:'11:11:11', isRead: false},
                    {message_type: 'some_message4',time:'11:11:11', isRead: false}
                ];
                store.dispatch(setNotifications(mock));

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
                // TODO: debug
                store.dispatch(deleteNotifications());
                console.error(error);
                throw Error(error);
            });
    }

}

export default NotificationsModel;
