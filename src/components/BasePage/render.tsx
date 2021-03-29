import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {Layout, Spin} from 'antd';

import Header from 'Components/Header/render';
import Footer from 'Components/Footer/render';

type IProps = RouteComponentProps & {
    children: JSX.Element | [JSX.Element] | Element | any,
    loading?: boolean
}

const BasePage = (props:IProps):JSX.Element => (
    <Layout>
        <Header {...props}/>
        <div className='base-page'>
            {props.loading
                ? <Spin />
                : <div className='base-page__content'>{props.children}</div>
            }

        </div>
        <Footer/>
    </Layout>
);

export default BasePage;
