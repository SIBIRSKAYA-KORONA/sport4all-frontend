import Network from 'Core/network';
import { Skill } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';

class ProfileModel {
    static async loadSkills(pid: number): Promise<HttpStatusCode | Skill[]> {
        return Network.fetchGet(Network.paths.profile.skills(pid))
            .then(res => {
                if (res.status >= 400) throw res.status as HttpStatusCode;
                return res.json() as Skill[];
            })
            .then(skills => Array.isArray(skills) ? skills : null);
    }
}

export default ProfileModel;
