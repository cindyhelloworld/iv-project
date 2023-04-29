
import React from "react";
import { min,max } from "d3";
import { XAxis, YAxis } from "./axes";
import { Scales } from "./scale";
import { Bars } from './bars';

export function BarChart (props) {
    const {offsetX, offsetY, height, width, data, selectedStation, setSelectedStation}=props;
    const xScale = Scales.band(data.map(d => d.Series_Title), width, 0);
    const yScale = Scales.linear(min(data, d=>d.justified_revenue),max(data, d=>d.justified_revenue),height, 0); 
    console.log(data)
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
         <Bars data={data} xScale={xScale} yScale={yScale} height={height}
        selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>
        <YAxis yScale={yScale} height={height} axisLabel={"Revenue(Million)"}/>
        <XAxis chartType={"bar"} xScale={xScale} height={height} width={width}/>
    </g>
}