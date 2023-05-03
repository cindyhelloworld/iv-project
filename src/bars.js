import React from "react";

const color = 'white'
const changecolor = 'white'

export function Bars(props){
    const {data,xScale, yScale, height, selectedStation, setSelectedStation}=props;
    const getColor = (selectedStation, station) => {
        if (station === selectedStation)
        {return changecolor
        }
        else{return "steelblue"}
    }
    return <g>
            { data.map( d =>
            <rect key={d.Series_Title} x={xScale(d.Series_Title)} y={yScale(d.justified_revenue)}
            width={xScale.bandwidth()} height={height-yScale(d.justified_revenue)} stroke={color}
            fill={getColor(selectedStation, d.Series_Title)}  onMouseEnter={()=> {setSelectedStation(d.Series_Title)}} 
            onMouseOut={()=> {setSelectedStation(null)}} />)}
    </g>

}