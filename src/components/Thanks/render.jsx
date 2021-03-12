import * as React from 'react';
import './style.scss';
import Network from '../../core/network';

function Thanks() {
    return (
        <div className='thanks'>
            <div className="thanks__message">
                <div className='thanks__message_first' onClick={
                    () => Network.fetchPost(Network.paths.teams, {
                        'name': 'Спартак',
                        'location': 'Moscow',
                        'link_on_avatar': 'image.png',
                        'about': 'Кто Спартак? Я Спартак!'
                    })
                        .then(response => { console.log(response); })
                        .catch(error => { console.log(error); })
                }>Создать команду</div>
                <div className='thanks__message_second' onClick={
                    () => Network.fetchGet(Network.paths.settings)
                        .then(response => { console.log(response); })
                        .catch(error => { console.log(error); })
                }>Получить настройки 2020</div>
                <div className='thanks__message_third' onClick={
                    () => Network.fetchPost(Network.paths.settings, {
                        'email': 'newpochta@mail.ru',
                        'nickname': 'zarabotaj_plz',
                        'name': 'Egor',
                        'surname': 'Bedov'
                    })
                        .then(response => { console.log(response); })
                        .catch(error => { console.log(error); })
                }>Отправить пользователя</div>
            </div>
        </div>
    );
}

export default Thanks;
