import Network from 'Core/network';
import HttpStatusCode from 'Utils/httpErrors';
import { Invite } from 'Utils/types';

class InvitesModel {
    static async getInvites():Promise<HttpStatusCode | Invite[]> {
        return Network.fetchGet(Network.paths.invites.base)
            .then(response => {
                if (response.status >= 400) throw response.status;
                return response.json();
            });
    }
}

export default InvitesModel;
