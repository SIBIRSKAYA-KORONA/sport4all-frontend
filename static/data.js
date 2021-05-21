import {CONST} from 'Utils/constants';
import ForkIcon from 'Static/icons/pin.svg';
import IssueIcon from 'Static/icons/issue.svg';
import JSIcon from 'Static/icons/js.svg';
import TSIcon from 'Static/icons/ts.svg';
import ReactIcon from 'Static/icons/react.svg';
import ReduxIcon from 'Static/icons/redux.svg';

const Data = {
    Setups: [
        {
            stack: [CONST.TECH.REACT, CONST.TECH.REDUX, CONST.TECH.TS],
            link: 'https://github.com/EgorBedov/FrontEnd-Starter/tree/React-Redux-TS'
        },
        {
            stack: [CONST.TECH.REACT, CONST.TECH.REDUX, CONST.TECH.JS],
            link: 'https://github.com/EgorBedov/FrontEnd-Starter/tree/React-Redux-JS'
        },
        {
            stack: [CONST.TECH.TS],
            link: 'https://github.com/EgorBedov/FrontEnd-Starter/tree/TS'
        },
        {
            stack: [CONST.TECH.JS],
            link: 'https://github.com/EgorBedov/FrontEnd-Starter/tree/JS'
        },
    ],
    Contributions: [
        {
            icon: ForkIcon,
            title: 'Fork',
            link: 'https://github.com/EgorBedov/FrontEnd-Starter',
            message: 'Fork this repository to submit new setups and improvements'
        },
        {
            icon: IssueIcon,
            title: 'Issue',
            link: 'https://github.com/EgorBedov/FrontEnd-Starter/issues/new',
            message: 'Found a bug or error - create an issue dedicated to it'
        }
    ],
    Icons: new Map([
        [CONST.TECH.JS, JSIcon],
        [CONST.TECH.TS, TSIcon],
        [CONST.TECH.REACT, ReactIcon],
        [CONST.TECH.REDUX, ReduxIcon],
    ]),
    Sports: ['football', 'basketball']
};

export default Data;
