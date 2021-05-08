import './style.scss';
import React, { useState } from 'react';

import { Button as AButton, message, Modal, Spin, Upload } from 'antd';
import { EventStatus, Meeting } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';
import MeetingModel from 'Models/MeetingModel';
import MeetingSteps from 'Components/Meeting/Steps/render';

import { ReactComponent as ClipIcon } from 'Static/icons/clip.svg';
import Button from 'Components/Button/render';
import Network from 'Core/network';
import MeetingPics from 'Pages/Meeting/Components/Pics/render';
import MeetingModalAddScoresTable from 'Pages/Meeting/Components/AddScoresTable/render';


type IProps = {
    meeting: Meeting,
    visible: boolean,
    onClose: (meeting:Meeting) => void,
}

function MeetingEditModal(props: IProps): JSX.Element {
    const [meeting, setMeeting] = useState(props.meeting);
    const [loadingPhotos, setLoadingPhotos] = useState(false);
    async function uploadPics(fileData:any):Promise<void> {
        setLoadingPhotos(true);
        const formData = new FormData();
        formData.append('meetingId', String(props.meeting.id));
        formData.append('attach', fileData.file);
        await Network.uploadFile(formData);
        MeetingModel.getMeeting(meeting.id)
            .then((m:Meeting) => setMeeting(m))
            .finally(() => setLoadingPhotos(false));
    }
    async function changeStatus():Promise<void> {
        if (!confirm('Вы подтверждаете изменение статуса встречи?\nВернуть его обратно будет невозможно')) return;
        await MeetingModel.changeStatus(meeting.id, meeting.status + 1)
            .then(() => { setMeeting(prev => ({ ...prev, status:meeting.status+1 })) })
            .catch(e => {
                const error = e as HttpStatusCode;
                let errorText = 'Ошибка';
                switch (error) {
                case HttpStatusCode.FORBIDDEN: errorText = 'У вас нет прав'; break;
                }
                message.error(errorText);
            });
    }

    return (
        <Modal
            title='Судейский мостик'
            visible={props.visible}
            className='meeting__modal'
            onCancel={() => props.onClose(meeting)}
            width={900}
            footer={[
                <Button key='success' color='blue' type='filled' text='Готово' onClick={() => props.onClose(meeting)}/>,
            ]}
        >
            <section className='meeting__modal_section-top'>
                <div className='meeting__modal_status'>
                    <h3>Состояние встречи</h3>
                    <MeetingSteps current={meeting.status} />
                    <Button color='blue' text='Следующий этап' type='filled' onClick={changeStatus} />
                </div>
                <div className='meeting__modal_pics'>
                    <div className='meeting__modal_title'>
                        <h3>Галерея</h3>
                        <Upload
                            multiple
                            fileList={[]}
                            showUploadList={false}
                            customRequest={uploadPics}
                        ><Button color='blue' text='ДОБАВИТЬ ФОТО' type='link' icon={loadingPhotos ? <Spin/> : <ClipIcon/>}/></Upload>
                    </div>
                    <MeetingPics perView={3} attaches={meeting.attachments || []} carouselClass='meeting__modal_pics_glide'/>
                </div>
            </section>
            {props.meeting.status === EventStatus.InProgressEvent &&
                <section className='meeting__modal_section-bottom'>
                    <div className='meeting__modal_title'>
                        <h3>Результаты спортсменов</h3>
                        <Upload
                            fileList={[]}
                            showUploadList={false}
                            customRequest={() => { message.error('Пока не работает') }}
                        ><Button color='blue' text='РАСПОЗНАТЬ ПРОТОКОЛ' type='link' icon={<ClipIcon/>}/></Upload>
                    </div>
                    <div className='meeting__modal_tables'>
                        <MeetingModalAddScoresTable team={props.meeting.teams[0]}/>
                        <MeetingModalAddScoresTable team={props.meeting.teams[1]}/>
                    </div>
                </section>
            }
        </Modal>
    )
}

export default MeetingEditModal;
