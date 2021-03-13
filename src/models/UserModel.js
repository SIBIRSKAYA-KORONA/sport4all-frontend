import Network from '../core/network';

// SINGLETON
const userModelSymbol = Symbol('Model for user');
const userModelEnforcer = Symbol('The only object that can create UserModel');

class UserModel {
    constructor(enforcer) {
        if (enforcer !== userModelEnforcer) {
            throw 'Instantiation failed: use UsersModel.instance instead of new()';
        }
    }

    static get instance() {
        if (!this[userModelSymbol])
            this[userModelSymbol] = new UserModel(userModelEnforcer);
        return this[userModelSymbol];
    }

    static set instance(v) {
        throw 'Can\'t change constant property!';
    }

    /**************************************
                    User
     *************************************/

    /**
     *
     * @param user {
     *      nickname: String
     *      password: String
     * }
     * @return {Promise<Object>}
     */
    async signUp(user) {
        return Network.fetchPost(Network.paths.settings, user).then(
            response => {
                if (response.status > 499) throw new Error('server error');
                return response.json();
            },
            error => { throw new Error(error); }
        );
    }

    async getLogin(user) {
        return Network.fetchPost(Network.paths.sessions, user).then(
            response => {
                switch (response.status) {
                case 200: // успешная регистрация
                    return response.json();
                case 404: // юзера не существует
                    return new Error('User not exists');
                case 500:
                    return new Error('Server error');
                }
            },
            error => { throw new Error(error); }
        );
    }

    async logout(user) {
        return Network.fetchDelete(Network.paths.sessions, user).then(
            response => {
                if (response.status > 499) throw new Error('Server error');
                return response.json();
            },
            error => { throw new Error(error); }
        );
    }
}

export default UserModel;
