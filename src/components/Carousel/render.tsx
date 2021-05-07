import * as React from 'react';
import Glide from '@glidejs/glide';
import { useState, useEffect } from 'react';

import ArrowIcon from 'Static/icons/arrow_circled.svg';


interface IProps {
    className: string,
    options: {
        type: 'carousel',
        startAt: number,
        perView: number,
    },
    children: JSX.Element[],
    withArrows: boolean,

}

const Carousel = (props:IProps):JSX.Element => {
    const perView = props.options.perView > props.children.length
        ? props.options.perView
        : props.children.length;
    const [slider] = useState(new Glide(`.${props.className}.glide`, { ...props.options, perView:perView }));
    useEffect(() => {
        slider.mount();

        // subscribe to an event
        slider.on('run.before', (event) => {
            // ... do something cool here
        });

        // cleanup when unmounting component
        return () => slider.destroy();
    }, [])

    return (
        <div className={props.className + ' glide'}>
            {props.withArrows && props.children.length > props.options.perView &&
                <div className="glide__arrows" data-glide-el="controls">
                    <img className="glide__arrow glide__arrow--left" data-glide-dir="<" src={ArrowIcon} alt="prev"/>
                    <img className="glide__arrow glide__arrow--right" data-glide-dir=">" src={ArrowIcon} alt="next"/>
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

export default Carousel;
