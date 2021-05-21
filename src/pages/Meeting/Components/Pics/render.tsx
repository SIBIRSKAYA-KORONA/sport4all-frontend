import * as React from 'react';
import { IAvatar } from 'Utils/types';
import Carousel from 'Components/Carousel/wrapper';


interface IProps {
    attaches: IAvatar[],
    perView: number,
    carouselClass: string,
    imgClass?: string,
}

function MeetingPics(props: IProps): JSX.Element {
    return (
        props.attaches.length >= props.perView
            ? <Carousel className={props.carouselClass} options={{ type:'carousel', perView:props.perView }} withArrows arrowStyle={{ offset:-15 }}>
                {props.attaches.map((a, i) => (
                    <li key={i}>
                        <img src={a.url} alt={a.filename} className={props.imgClass || ''}/>
                    </li>
                ))}
            </Carousel>
            : <div className={props.carouselClass + ' empty'}>
                {props.attaches?.map(a => <img key={a.id} src={a.url} alt={a.filename} className={props.imgClass || ''}/>)}
            </div>
    );
}

export default MeetingPics;
