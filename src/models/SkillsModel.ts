import Network from 'Core/network';
import { Skill } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';

class SkillsModel {
    static async searchSkills(text: string): Promise<HttpStatusCode | Skill[]> {
        return Network.fetchGet(Network.paths.skills.search(text))
            .then(res => {
                if (res.status >= 400) return res.status as HttpStatusCode;
                return res.json() as Array<Skill>;
            })
            .catch(e => console.error(e));
    }

    static async addSkills(pid:number, skills:Skill[]): Promise<HttpStatusCode | Skill[]> {
        return Network.fetchPost(Network.paths.skills.add(pid), {skills: skills})
            .then(res => {
                if (res.status >= 400) return res.status as HttpStatusCode;
                return res.json();
            })
            .catch(e => console.error(e));
    }
}

export default SkillsModel;
