import './style.scss';
import * as React from 'react';

import Logo from 'Static/images/logo.png'
import DevelopmentIcon from 'Static/icons/development.svg'
import {Link} from 'react-router-dom';
import {PATHS} from 'Constants';

const MobilePlaceholder = (): JSX.Element => {
    return (
        <div className={'mobile_placeholder__col'}>
            <Link to={PATHS.root}>
                <img className={'mobile_placeholder__logo'} src={Logo} alt={'Logo'}/>
            </Link>

            <div className={'mobile_placeholder__content'}>
                <img className={'mobile_placeholder__icon'} src={DevelopmentIcon} alt={'Development icon'}/>
                <h3 className={'mobile_placeholder__text'}>Мобильная версия в разработке</h3>
            </div>
        </div>

    )
};


export default MobilePlaceholder;
