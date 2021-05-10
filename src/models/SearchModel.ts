import Network from 'Core/network';
import {SearchEntities} from 'Utils/enums';
import {User} from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';

class SearchModel {
    static async searchAll(namePart: string, limit: number, offset: number) {
        return (await Network.fetchGet(Network.paths.search(
            [SearchEntities.Team, SearchEntities.Tournament, SearchEntities.User], namePart, limit, offset)
        )).json();
    }
}

export default SearchModel;
