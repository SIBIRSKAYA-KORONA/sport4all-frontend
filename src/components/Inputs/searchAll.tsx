import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { AutoComplete, Button, Input, message, Typography } from 'antd';
const { Text } = Typography;
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { Team, Tournament, User } from 'Utils/types';
import TeamModel from 'Models/TeamModel';
import CONST from 'Constants';


type CombinedResult = {
    teams: Team[],
    users: User[],
    tournaments: Tournament[]
}

function SearchAll(props: RouteComponentProps): JSX.Element {
    const [searching, setSearching] = React.useState(false);
    const [result, setResult] = React.useState<CombinedResult>({ teams: [], users: [], tournaments: [] });
    const [options, setOptions] = React.useState([]);

    const debouncedSearch = AwesomeDebouncePromise((text:string) => {
        return Promise.all([
            TeamModel.searchTeams(text, 3)
        ]);
    }, 500);

    async function handleInputChange(text) {
        if (!text) return;
        setSearching(true);
        return debouncedSearch(text)
            .then(arr => setResult({ teams:arr[0], users:[], tournaments:[] }))
            .finally(() => setSearching(false));
    }

    function renderTeam(t:Team) {
        return {
            value: t.id,
            label: <Link to={CONST.PATHS.teams.id(t.id)}>{t.name}</Link>
        };
    }

    function renderTournament(t:Tournament) {
        return {
            value: t.id,
            label: <Link to={CONST.PATHS.tournaments.id(t.id)}>{t.name}</Link>
        };
    }

    function renderUser(u:User) {
        return {
            value: u.nickname,
            label: <Link to={CONST.PATHS.profile.nickname(u.nickname)}>{u.name} {u.surname}</Link>
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
        dropdownMatchSelectWidth={500}
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
