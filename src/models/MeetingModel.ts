import Network from '../core/network';
import HttpStatusCode from 'Utils/httpErrors';

class MeetingModel {
    static async getMeeting(mid: number):Promise<HttpStatusCode> {
        return Network.fetchGet(Network.paths.meetings.id(mid))
            .then(response => {
                if (response.status >= 400) throw response.status;
                else return response.json();
            })
            .catch(error => { throw new Error(error); });
    }
}

export default MeetingModel;
