import Network from '../core/network';
import HttpStatusCode from 'Utils/httpErrors';
import {EventStatus, Meeting} from 'Utils/types';

class MeetingModel {
    static async getMeeting(mid: number):Promise<HttpStatusCode | Meeting> {
        return Network.fetchGet(Network.paths.meetings.id(mid))
            .then(response => {
                if (response.status >= 400) throw response.status;
                return response.json();
            })
            .then(meeting => {
                ['teams', 'stats', 'prevMeetings'].forEach(key => {
                    if (!meeting[key]) meeting[key] = [];
                });
                return meeting;
            })
            .catch(e => { throw new Error(e); });
    }

    static async changeStatus(mid: number, status: EventStatus):Promise<HttpStatusCode | Meeting> {
        return Network.fetchPut(Network.paths.meetings.id(mid), { status:status })
            .then(response => {
                if (response.status >= 400) throw HttpStatusCode[response.status];
                return;
            })
            .catch(e => { throw new Error(e); });
    }
}

export default MeetingModel;
