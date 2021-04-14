import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { AutoComplete, Input, Typography } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import CONST from 'Constants';
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

    function renderTeam(t:Team) {
        return {
            value: 'team'+t.id,
            label: <Link to={CONST.PATHS.teams.id(t.id)}>{t.name}</Link>
        };
    }

    function renderTournament(t:Tournament) {
        return {
            value: 'tournament'+t.id,
            label: <Link to={CONST.PATHS.tournaments.id(t.id)}>{t.name}</Link>
        };
    }

    function renderUser(u:User) {
        return {
            value: 'user'+u.nickname,
            label: <Link to={CONST.PATHS.profile.nickname(u.nickname)}>{u.name} {u.surname} <Typography.Text type='secondary'>@{u.nickname}</Typography.Text></Link>
        };
    }

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
        onSelect={value => console.log(value)}
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
