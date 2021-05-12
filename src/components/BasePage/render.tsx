import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Header from 'Components/Header/render';
import FooterSmall from 'Components/Footer/Small/render';
import LoadingContainer from 'Components/Loading/render';
import Aside from 'Components/Aside/render';

type IProps = RouteComponentProps & {
    children: JSX.Element | [JSX.Element] | Element | any,
    loading?: boolean
}

const BasePage = (props:IProps):JSX.Element => (
    <div className='base-page'>
        <Header {...props}/>
        <div className='base-page__content'>
            <aside className="base-page__aside">
                <Aside {...props} />
            </aside>
            <main className='base-page__main'>
                <LoadingContainer loading={props.loading}>
                    {props.children}
                </LoadingContainer>
            </main>
        </div>
        <FooterSmall {...props}/>
    </div>
);

export default BasePage;
