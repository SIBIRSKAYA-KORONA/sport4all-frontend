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
    async createUser(user) {
        return Network.fetchPost(Network.paths.settings, user).then(
            response => {
                if (response.status > 499) throw new Error('server error');
                return response.json();
            },
            error => { throw new Error(error); }
        );
    }
}

export default UserModel;
