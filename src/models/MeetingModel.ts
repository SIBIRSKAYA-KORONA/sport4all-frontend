import Network from 'Core/network';
import HttpStatusCode from 'Utils/httpErrors';
import {EventStatus, Meeting, Stats} from 'Utils/types';
import { BasketballProtocols } from 'Utils/enums';

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
            .catch(e => { throw e; });
    }

    static async changeStatus(mid: number, status: EventStatus):Promise<HttpStatusCode | void> {
        return Network.fetchPut(Network.paths.meetings.id(mid), { status:status })
            .then(response => {
                if (response.status >= 400) throw response.status;
            });
    }

    static async addTeam(mid:number, tid:number):Promise<HttpStatusCode | void> {
        return Network.fetchPost(Network.paths.meetings.addTeam(mid, tid), {})
            .then(response => {
                if (response.status === HttpStatusCode.NOT_ACCEPTABLE) throw new Error ('Start the match first');
            });
    }

    static async addTeamResults(stats: Stats):Promise<HttpStatusCode | void> {
        return Network.fetchPut(Network.paths.meetings.addResultsForTeam(stats.meetingId, stats.teamId), stats)
            .then(response => {
                if (response.status >= HttpStatusCode.BAD_REQUEST) throw HttpStatusCode[response.status];
            });
    }

    static async addPlayerResults(stats: Stats):Promise<HttpStatusCode | void> {
        return Network.fetchPut(Network.paths.meetings.addResultsForPlayer(stats.meetingId, stats.teamId, stats.playerId), stats)
            .then(response => {
                if (response.status >= HttpStatusCode.BAD_REQUEST) throw response.status;
            });
    }

    static async addPlayersResultsNew(meeting:Meeting, stats: Stats[]):Promise<HttpStatusCode | Stats[]> {
        return Network.fetchPost(Network.paths.meetings.playerStats(meeting.id), stats)
            .then(response => {
                if (response.status >= HttpStatusCode.BAD_REQUEST) throw response.status;
                return response.json();
            });
    }

    static async getStats(mid:number):Promise<HttpStatusCode | Array<Stats>> {
        return Network.fetchGet(Network.paths.meetings.stats(mid))
            .then(response => {
                if (response.status >= HttpStatusCode.BAD_REQUEST && response.status !== HttpStatusCode.NOT_FOUND) throw HttpStatusCode[response.status];
                return response.json();
            });
    }

    static async getStatsFromPhoto(meeting:Meeting, protocol:BasketballProtocols, path:string):Promise<HttpStatusCode | Array<Stats>> {
        return Network.fetchGet(Network.paths.meetings.recognition(meeting.id, protocol, path))
            .then(response => {
                if (response.status >= HttpStatusCode.BAD_REQUEST && response.status !== HttpStatusCode.NOT_FOUND) throw HttpStatusCode[response.status];
                return response.json();
            });
    }
}

export default MeetingModel;
