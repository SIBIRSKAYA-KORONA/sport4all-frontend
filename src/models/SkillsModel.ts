import Network from 'Core/network';
import { Skill } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';

class SkillsModel {
    static async searchSkills(text:string): Promise<HttpStatusCode|Skill[]> {
        return Network.fetchGet(Network.paths.skills.search(text))
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            })
            .then(skills => Array.isArray(skills) ? skills : [])
            .catch(e => console.error(e));
    }

    static async createSkill(pid:number, skillName:string): Promise<HttpStatusCode|Skill[]> {
        return Network.fetchPost(Network.paths.skills.create(pid), { name:skillName })
            .then(res => {
                if (res.status >= 400) throw res.status;
                return res.json();
            })
            .catch(e => console.error(e));
    }

    // same as adding one to yourself
    static async approveSkill(pid:number, skillId:number): Promise<HttpStatusCode | Skill[]> {
        return Network.fetchPost(Network.paths.skills.approve(skillId, pid), {})
            .then(res => {
                if (res.status >= 400) throw res.status;
                return;
            })
            .catch(e => console.error(e));
    }
}

export default SkillsModel;
