import { CONST } from 'Constants';
import store from '../store/store';

// SINGLETON
const personModelSymbol = Symbol('Model for person');
const personModelEnforcer = Symbol('The only object that can create PersonModel');

class PersonModel {
    constructor(enforcer) {
        if (enforcer !== personModelEnforcer) {
            throw 'Instantiation failed: use PersonsModel.instance instead of new()';
        }
    }

    static get instance() {
        if (!this[personModelSymbol])
            this[personModelSymbol] = new PersonModel(personModelEnforcer);
        return this[personModelSymbol];
    }

    static set instance(v) {
        throw 'Can\'t change constant property!';
    }

    /**************************************
                    Person
     *************************************/

    async savePersons() {
        localStorage.setItem(
            CONST.LOCAL_STORAGE.PERSONS,
            JSON.stringify(store.getState().persons));
    }

    async deleteAllPersons() {
        localStorage.removeItem(CONST.LOCAL_STORAGE.PERSONS);
    }

    async loadPersons() {
        try {
            const persons = JSON.parse(localStorage.getItem(CONST.LOCAL_STORAGE.PERSONS));
            if (persons === null) {
                return [];
            } else {
                return persons;
            }
        }
        catch (e) {
            return [];
        }
    }
}

export default PersonModel;
