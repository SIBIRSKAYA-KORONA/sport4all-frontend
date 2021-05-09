import React from 'react';

import {Modal, Radio} from 'antd';
import { BasketballProtocols } from 'Utils/enums';
import Button from 'Components/Button/render';
import { AWSFile } from 'Utils/types';
import LoadingContainer from 'Components/Loading/render';


type IProps = {
    visible: boolean,
    photo: AWSFile|null,
    protocol: BasketballProtocols,
    onChange: (protocol: BasketballProtocols) => void,
    onClose: () => void,
    onCancel: () => void,
}

function ChooseProtocolModal(props: IProps): JSX.Element {
    return (
        <Modal
            title='Выберите тип протокола'
            visible={props.visible}
            onCancel={props.onCancel}
            width={900}
            centered
            footer={[
                <Button key="back" color='blue' text='Готово' type='filled' onClick={() => props.onClose()}/>,
            ]}
        >
            <LoadingContainer loading={!props.photo}>
                {props.photo && <img style={{ width:'100%', height:'100%' }} src={props.photo.url} alt={props.photo.url}/>}
            </LoadingContainer>
            <h3>Выберите тип протокола</h3>
            <Radio.Group onChange={(e) => props.onChange(e.target.value)} value={props.protocol}>
                {Object.keys(BasketballProtocols).map(key => <Radio.Button key={key} value={BasketballProtocols[key]}>{BasketballProtocols[key]}</Radio.Button>)}
            </Radio.Group>
        </Modal>
    )
}

export default ChooseProtocolModal;
