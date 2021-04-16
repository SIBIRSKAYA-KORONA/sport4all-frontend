import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { AutoComplete, Input, Typography } from 'antd';
const { Text } = Typography;
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { PATHS } from 'Constants';
import TeamModel from 'Models/TeamModel';
import ProfileModel from 'Models/ProfileModel';
import TournamentModel from 'Models/TournamentModel';
import { Team, Tournament, User } from 'Utils/types';


type CombinedResult = {
    teams: Team[],
    users: User[],
    tournaments: Tournament[]
}

const initResult = { teams: [], users: [], tournaments: [] };

function SearchAll(props: RouteComponentProps): JSX.Element {
    const [searching, setSearching] = React.useState(false);
    const [result, setResult] = React.useState<CombinedResult>(initResult);
    const [options, setOptions] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');

    const debouncedSearch = AwesomeDebouncePromise((text:string) => {
        return Promise.all([
            TeamModel.searchTeams(text, 3),
            ProfileModel.searchUsers(text, 3),
            TournamentModel.searchTournaments(text, 3)
        ]);
    }, 500);

    async function handleInputChange(text) {
        if (!text) {
            setResult(initResult);
            return;
        }
        setSearching(true);
        return debouncedSearch(text)
            .then(arr => setResult({
                teams:arr[0] as Team[],
                users:arr[1] as User[],
                tournaments:arr[2] as Tournament[]
            }))
            .finally(() => setSearching(false));
    }

    const renderTeam = (t:Team) => ({
        ket: 'team'+t.id,
        value: PATHS.teams.id(t.id),
        label: <Text>{t.name}</Text>
    });

    const renderTournament = (t:Tournament) => ({
        key: 'tournament'+t.id,
        value: PATHS.tournaments.id(t.id),
        label: <Text>{t.name}</Text>
    });

    const renderUser = (u:User) => ({
        key: 'user'+u.nickname,
        value: PATHS.profile.nickname(u.nickname),
        label: <><Text>{u.name} {u.surname}</Text><Text type='secondary'>@{u.nickname}</Text></>,
    });

    React.useEffect(() => {
        const options = [];
        if (result.teams.length > 0)
            options.push({ label:'Команды', options:result.teams.map(t => renderTeam(t)) });
        if (result.tournaments.length > 0)
            options.push({ label:'Турниры', options:result.tournaments.map(t => renderTournament(t)) });
        if (result.users.length > 0)
            options.push({ label:'Люди', options:result.users.map(u => renderUser(u)) });
        // if (options.length > 0)
            // options.push({ label:<Text type='secondary'>Показать все результаты</Text> });
        setOptions(options);
    }, [result]);

    return (<AutoComplete
        dropdownMatchSelectWidth={400}
        style={{ width: 250 }}
        options={options}
        onSelect={link => {
            props.history.push(link);
            setSearchText('');
            setResult(initResult);
        }}
        value={searchText}
        onChange={e => setSearchText(e)}
    >
        <Input.Search
            loading={searching}
            className={'header__search'}
            placeholder={'Ищите команды, турниры, спортсменов'}
            onChange={e => handleInputChange(e.target.value)}
        />
    </AutoComplete>);
}

export default SearchAll;
