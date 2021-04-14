import Network from 'Core/network';
import { Skill, Stats } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';

class ProfileModel {
    static async loadSkills(pid: number): Promise<HttpStatusCode | Skill[]> {
        return Network.fetchGet(Network.paths.profile.skills(pid))
            .then(res => {
                if (res.status >= 400) throw res.status as HttpStatusCode;
                return res.json();
            })
            .then(skills => Array.isArray(skills) ? skills : []);
    }

    static async loadStats(pid: number): Promise<HttpStatusCode | Stats[]> {
        return Network.fetchGet(Network.paths.profile.stats(pid))
            .then(res => {
                if (res.status >= 400) throw res.status as HttpStatusCode;
                return res.json();
            })
            .then(stats => Array.isArray(stats) ? stats : []);
    }
}

export default ProfileModel;
