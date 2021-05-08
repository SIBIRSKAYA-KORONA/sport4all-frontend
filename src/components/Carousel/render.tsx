import './style.scss';
import * as React from 'react';
import Glide from '@glidejs/glide';
import { useState, useEffect } from 'react';
import { IProps } from './interface';

import ArrowIcon from 'Static/icons/arrow_circled.svg';


const CarouselInner = (props:IProps):JSX.Element => {
    const slider = new Glide(`.${props.className}.glide`, { ...props.options, perView:Math.min(props.children.length, props.options.perView) });

    useEffect(() => {
        slider.mount();
        // cleanup when unmounting component
        return () => slider.destroy();
    }, []);

    return (
        <div className={props.className + ' glide'}>
            {props.withArrows && props.children.length > props.options.perView &&
                <div className="glide__arrows" data-glide-el="controls" style={{ left:props.arrowStyle?.offset, right:props.arrowStyle?.offset}}>
                    <img className="glide__arrow glide__arrow--left" data-glide-dir="<" src={ArrowIcon} alt="prev" width={props.arrowStyle?.width}/>
                    <img className="glide__arrow glide__arrow--right" data-glide-dir=">" src={ArrowIcon} alt="next" width={props.arrowStyle?.width}/>
                </div>
            }
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    {props.children.map((slide, index) => React.cloneElement(slide, {
                        key: index,
                        className: `${slide.props.className || ''} glide__slide`
                    }))}
                </ul>
            </div>
        </div>
    );
}

export default CarouselInner;
