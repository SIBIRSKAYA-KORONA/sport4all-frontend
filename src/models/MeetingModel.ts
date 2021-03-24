import Network from '../core/network';
import HttpStatusCode from 'Utils/httpErrors';
import {Meeting} from 'Utils/types';

class MeetingModel {
    static async getMeeting(mid: number):Promise<HttpStatusCode | Meeting> {
        return Network.fetchGet(Network.paths.meetings.id(mid))
            .then(response => {
                if (response.status >= 400) throw response.status;
                else return response.json();
            })
            .then(meeting => {
                ['teams', 'stats', 'prevMeetings'].forEach(key => {
                    if (!meeting[key]) meeting[key] = [];
                });
                return meeting;
            })
            .catch(error => { throw new Error(error); });
    }
}

export default MeetingModel;
