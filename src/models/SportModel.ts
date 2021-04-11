import Network from 'Core/network';
import { Sport } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';

class SportsModel {
    static async loadSports(): Promise<HttpStatusCode|Sport[]> {
        return Network.fetchGet(Network.paths.sports)
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            })
            .then(sports => Array.isArray(sports) ? sports : [])
            .catch(e => console.error(e));
    }
}

export default SportsModel;
