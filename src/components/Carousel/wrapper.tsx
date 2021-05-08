import './style.scss';
import * as React from 'react';
import CarouselInner from 'Components/Carousel/render';
import { IProps } from './interface';


// This is done due to problem with updating slides
// https://github.com/glidejs/glide/pull/457
//
// Basically when the key changes - element gets unmounted and mounted again
const Carousel = (props:IProps):JSX.Element => (
    <div key={props.children.length}>
        <CarouselInner {...props}>
            {props.children}
        </CarouselInner>
    </div>
);

export default Carousel;
