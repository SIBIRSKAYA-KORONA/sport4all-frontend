import * as React from 'react';
import './style.scss';
import Network from '../../core/network';

function Thanks() {
    return (
        <div className='thanks'>
            <div className="thanks__message">
                <div className='thanks__message_first' onClick={
                    () => Network.fetchPost(Network.paths.settings, {
                        'age': 225,
                        'email': 'mai54',
                        'nickname': 'f2c1a76b41324545',
                        'name': 'name54',
                        'surname': 'surname54'
                    })
                        .then(response => { console.log(response); })
                        .catch(error => { console.log(error); })
                }>Thanks for using</div>
                <div className='thanks__message_second' onClick={
                    () => Network.fetchGet(Network.paths.settings)
                        .then(response => { console.log(response); })
                        .catch(error => { console.log(error); })
                }>FrontEnd Starter 2020</div>
                <div className='thanks__message_third'>by Egor Bedov</div>
            </div>
        </div>
    );
}

export default Thanks;
