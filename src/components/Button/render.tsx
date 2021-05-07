import './style.scss';
import * as React from 'react';

interface IProps {
    color: 'white' | 'purple' | 'blue',
    type: 'filled' | 'link',
    icon?: React.ReactNode,
    text: string,
    className?: string
}

const Button = (props:IProps):JSX.Element => (
    <button className={`button_${props.color} button_${props.type} ${props.className || ''}`}>
        <div className='button__icon'>{props.icon}</div>
        <span className='button__text'>{props.text}</span>
    </button>
);

export default Button;
