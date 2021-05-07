import './style.scss';
import * as React from 'react';
import Glide from '@glidejs/glide';
import { useState, useEffect } from 'react';

import ArrowIcon from 'Static/icons/arrow_circled.svg';


interface IProps {
    className: string,
    options: {
        type: 'carousel',
        startAt?: number,
        perView: number,
    },
    children: JSX.Element[],
    withArrows: boolean,
    arrowStyle?: {
        offset?: number,
        width?: number,
    }

}

const Carousel = (props:IProps):JSX.Element => {
    const [children, setChildren] = useState(props.children || []);
    useEffect(() => setChildren(props.children || []), [props.children]);
    const [options, setOptions] = useState({ ...props.options });
    const [slider] = useState(new Glide(`.${props.className}.glide`, options));
    useEffect(() => {
        const perView = options.perView > children.length ? options.perView : children.length;
        setOptions(prev => ({ ...prev, perView:perView }));
    }, [children]);
    useEffect(() => slider.update(), [options]);
    useEffect(() => {
        slider.mount();
        // cleanup when unmounting component
        return () => slider.destroy();
    }, []);

    return (
        <div className={props.className + ' glide'}>
            {props.withArrows && children.length > props.options.perView &&
                <div className="glide__arrows" data-glide-el="controls" style={{ left:props.arrowStyle?.offset, right:props.arrowStyle?.offset}}>
                    <img className="glide__arrow glide__arrow--left" data-glide-dir="<" src={ArrowIcon} alt="prev" width={props.arrowStyle?.width}/>
                    <img className="glide__arrow glide__arrow--right" data-glide-dir=">" src={ArrowIcon} alt="next" width={props.arrowStyle?.width}/>
                </div>
            }
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    {children.map((slide, index) => React.cloneElement(slide, {
                        key: index,
                        className: `${slide.props.className || ''} glide__slide`
                    }))}
                </ul>
            </div>
        </div>
    );
}

export default Carousel;
