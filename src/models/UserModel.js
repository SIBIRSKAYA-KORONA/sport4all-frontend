import Network from '../core/network';
import { NotFoundError, ServerError, NotAuthorizedError } from 'Utils/errors';
import getCookie from 'Utils/csrf';
import CONST from 'Constants';

class UserModel {
    static async signUp(user) {
        return Network.fetchPost(Network.paths.settings, user).then(
            response => {
                if (response.status === 409) throw 'Такой пользователь существует';
                if (response.status > 499) throw 'server error';
            },
            error => { throw new Error(error); }
        );
    }

    /**
     * @return {Promise<Object | IError>}
     */
    static async getProfile() {
        return Network.fetchGet(Network.paths.settings).then(
            response => {
                if (response.status > 499) throw ServerError;
                if (response.status === 404) throw NotFoundError;
                if (response.status === 401) throw NotAuthorizedError;
                return response.json();
            },
            error => { throw new Error(error); }
        );
    }

    /**
     *
     * @param user
     * @return {Promise<Object | IError>}
     */
    static async getLogin(user) {
        return Network.fetchPost(Network.paths.sessions, user).then(
            response => {
                switch (response.status) {
                case 200: // успешная регистрация
                    return;
                case 404: throw NotFoundError;
                case 500: throw ServerError;
                }
            },
            error => { throw new Error(error); }
        );
    }

    static async logout(user) {
        return Network.fetchDelete(Network.paths.sessions, user).then(
            response => {
                if (response.status > 499) throw new Error('Server error');
                return response.json();
            },
            error => { throw new Error(error); }
        );
    }

    static async checkAuth() {
        const sessionID = getCookie(CONST.SESSION_ID);
        if (!sessionID) throw false;
        return this.getProfile();
    }
}

export default UserModel;
