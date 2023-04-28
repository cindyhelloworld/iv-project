import React from "react";

export function Points(props){
    const {data, xScale, yScale, height, width} = props;
    const getColor = () => {
        return "steelblue"
    }
    const getRadius = () =>  {
        return 5
    }
    return <g>
    {data.map(d => <circle key={d.Released_Year+"S"} cx={xScale(d.Released_Year)} 
    cy={yScale(d.IMDB_Rating)} r={getRadius()} stroke="black" 
    fill={getColor()} />)}
    </g>
}

