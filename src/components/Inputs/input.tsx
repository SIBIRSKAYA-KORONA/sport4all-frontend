import * as React from 'react';

interface IProps {
    placeholder?: string,
    className?: string,
}

function Input(props: IProps): JSX.Element {
    const [isEmpty, setIsEmpty] = React.useState(true);

    return <input placeholder={props.placeholder} onChange={e => setIsEmpty(!e.target.value)} className={`input ${props.className || ''} ${isEmpty ? '' : 'input__filled'}`}/>;
}

export default Input;
