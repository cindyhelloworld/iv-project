import React from "react";

export function Bars(props){
    const {data,xScale, yScale, height}=props;
    const getColor = () => {
       return "steelblue"
    }
    return <g>
            { data.map( d =>
            <rect key={d.Series_Title} x={xScale(d.Series_Title)} y={yScale(d.revenue)}
            width={xScale.bandwidth()} height={height-yScale(d.revenue)} stroke="black"
            fill={getColor()} />)}
    </g>

}