import './style.scss';
import * as React from 'react';

interface IProps {
    type: 'white' | 'purple',
    text: string,
    className?: string
}

const Button = (props:IProps):JSX.Element => (
    <button className={`button__${props.type} ${props.className || ''}`}>{props.text}</button>
);

export default Button;
