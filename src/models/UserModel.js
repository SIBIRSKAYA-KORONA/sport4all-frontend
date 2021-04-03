import store from 'Store/store';
import Network from '../core/network';
import { loginUser, logoutUser, setUser } from 'Store/User/UserActions';

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
     * @return {Promise<Object | HttpStatusCode>}
     */
    static async getProfile() {
        return Network.fetchGet(Network.paths.settings)
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            })
            .then(user => {
                store.dispatch(setUser(user));
                return user;
            })
            .catch(e => { throw e });
    }

    static async getProfileByNickname(nickname) {
        return Network.fetchGet(Network.paths.profile.nickname(nickname))
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            });
    }

    /**
     *
     * @param user
     * @return {Promise<Object | IError>}
     */
    static async getLogin(user) {
        return Network.fetchPost(Network.paths.sessions, user).then(res => {
            if (res.status >= 400) throw res.status;
            store.dispatch(loginUser());
        });
    }

    static async logout(user) {
        return Network.fetchDelete(Network.paths.sessions, user).then(
            response => {
                if (response.status > 499) throw new Error('Server error');
                if (response.status > 400) throw new Error(response.status);
                store.dispatch(logoutUser());
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
