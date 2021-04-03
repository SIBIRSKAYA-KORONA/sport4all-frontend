import Network from 'Core/network';
import { Skill } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';

class ProfileModel {
    static async loadSkills(pid: number): Promise<HttpStatusCode | Array<Skill>> {
        return Network.fetch(Network.paths.profile.skills(pid))
            .then(res => {
                if (res.status >= 400) return res.status as HttpStatusCode;
                return res.json() as Array<Skill>;
            });
    }
}

export default ProfileModel;
