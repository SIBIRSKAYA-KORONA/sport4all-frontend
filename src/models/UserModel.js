import Network from '../core/network';
import {NotFoundError, ServerError, NotAuthorizedError, ForbiddenError} from 'Utils/errors';
import store from 'Store/store';
import { loginUser, logoutUser } from 'Store/User/UserActions';

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
                if (response.status === 403) throw ForbiddenError;
                if (response.status === 404) throw NotFoundError;
                if (response.status === 401) throw NotAuthorizedError;
                if (response.status >= 400) throw new Error(response.status);
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

    static async checkAndSetAuth() {
        return this.getProfile()
            .then(() => {
                store.dispatch(loginUser());
                return true;
            })
            .catch(e => {
                store.dispatch(logoutUser());
                throw e;
            });
    }
}

export default UserModel;
