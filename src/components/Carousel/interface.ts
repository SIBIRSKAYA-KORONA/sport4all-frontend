export interface IProps {
    className: string,
    options: {
        type: 'carousel',
        startAt?: number,
        perView: number,
    },
    children: JSX.Element[], // if null - pass empty array
    withArrows: boolean,
    arrowStyle?: {
        offset?: number,
        width?: number,
    }
}
