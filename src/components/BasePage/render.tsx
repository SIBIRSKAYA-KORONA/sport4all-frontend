import * as React from 'react';
import './style.scss';

type IProps = {
    children: JSX.Element | [JSX.Element]
}

const BasePage = (props:IProps):JSX.Element => (
    <div className='base-page'>
        <div className='base-page__content'>
            {props.children}
        </div>
    </div>
);

export default BasePage;
