import './style.scss';
import React, { useState } from 'react';
import { message, Modal, Spin, Upload } from 'antd';

import Network from 'Core/network';
import HttpStatusCode from 'Utils/httpErrors';
import Button from 'Components/Button/render';
import MeetingModel from 'Models/MeetingModel';
import MeetingSteps from 'Components/Meeting/Steps/render';
import MeetingPics from 'Pages/Meeting/Components/Pics/render';
import { EventStatus, Meeting, Stats, Team, User } from 'Utils/types';
import MeetingModalAddScoresTable from 'Pages/Meeting/Components/AddScoresTable/render';

import { ReactComponent as ClipIcon } from 'Static/icons/clip.svg';


type IProps = {
    meeting: Meeting,
    visible: boolean,
    onClose: (meeting:Meeting) => void,
    saveStats: (stats:Stats[]) => void,
    stats?: Stats[],
}

function MeetingEditModal(props: IProps): JSX.Element {
    const [stats, setStats] = useState<Stats[]>(props.stats || []);
    const [meeting, setMeeting] = useState(props.meeting);
    const [loadingPhotos, setLoadingPhotos] = useState(false);
    const [loadingRecognition, setLoadingRecognition] = useState(false);
    const [savingStats, setSavingStats] = useState(false);

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

    function changeStats(value:number, player:User, team:Team) {
        value = +value || null;
        setStats(prev => {
            prev = prev.filter(s => s.playerId !== player.id && s.teamId !== team.id);
            prev.push({
                meetingId   :meeting.id,
                score       :value,
                playerId    :player.id,
                teamId      :team.id,
            });
            return prev;
        })
    }

    function recognizeProtocol(fileData:any):void {
        setLoadingRecognition(true);
        // const formData = new FormData();
        // formData.append('meetingId', String(props.meeting.id));
        // formData.append('attach', fileData.file);
        // await Network.uploadFile(formData);
        MeetingModel.getStatsFromPhoto(meeting, 'DCm8ED3ZAip3AqP3i4Ddt2GCqRAKJpG9')
            .then((stats:Stats[]) => setStats(stats))
            .catch(e => { message.error(e) })
            .finally(() => setLoadingRecognition(false));
    }

    async function saveStats():Promise<void> {
        setSavingStats(true);
        MeetingModel.addPlayersResultsNew(meeting, stats.filter(s => s.score !== 0))
            .then((newStats:Stats[]) => { props.saveStats(newStats) })
            .catch(e => { message.error(e.toString()) })
            .finally(() => setSavingStats(false));
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
            {meeting.status === EventStatus.InProgressEvent &&
                <section className='meeting__modal_section-bottom'>
                    <div className='meeting__modal_title'>
                        <h3>Результаты спортсменов</h3>
                        {/*<Upload*/}
                        {/*    fileList={[]}*/}
                        {/*    showUploadList={false}*/}
                        {/*    customRequest={recognizeProtocol}*/}
                        {/*><Button color='blue' text='РАСПОЗНАТЬ ПРОТОКОЛ' type='link' icon={loadingRecognition ? <Spin/> : <ClipIcon/>}/></Upload>*/}
                        <Button color='blue' text='РАСПОЗНАТЬ ПРОТОКОЛ' type='link' icon={loadingRecognition ? <Spin/> : <ClipIcon/>} onClick={() => recognizeProtocol(null)}/>
                    </div>
                    <div className='meeting__modal_tables'>
                        <MeetingModalAddScoresTable stats={stats} onChange={changeStats} team={meeting.teams[0]}/>
                        <MeetingModalAddScoresTable stats={stats} onChange={changeStats} team={meeting.teams[1]}/>
                    </div>
                    <Button color='blue' type='filled' text='Сохранить результаты' onClick={saveStats} icon={savingStats && <Spin/>}/>
                </section>
            }
        </Modal>
    )
}

export default MeetingEditModal;
