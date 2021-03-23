import * as React from 'react';
import './style.scss';

import {Layout} from 'antd';

import Header from 'Components/Header/render';
import Footer from 'Components/Footer/render';

type IProps = {
    children: JSX.Element | [JSX.Element] | Element | any
}

const BasePage = (props:IProps):JSX.Element => (
    <Layout>
        <Header/>
        <div className='base-page'>
            <div className='base-page__content'>
                {props.children}
            </div>
        </div>
        <Footer/>
    </Layout>
);

export default BasePage;
