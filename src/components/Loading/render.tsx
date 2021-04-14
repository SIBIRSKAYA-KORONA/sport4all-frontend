import * as React from 'react';
import { Spin, Empty } from 'antd';


interface IProps {
    children: JSX.Element | [JSX.Element] | Element | any,
    loading: boolean,
    empty?: {
        check: boolean,
        message: string
    }
}

const LoadingContainer = (props:IProps):JSX.Element => {
    return props.loading
        ? <Spin/>
        : props.empty && props.empty.check
            ? <Empty description={props.empty.message}/>
            : props.children;
};

export default LoadingContainer;
