import React from "react";
import { min,max } from 'd3';
import { Scales } from "./scale";
import { Points } from "./points";
import { XAxis, YAxis } from "./axes";


export function ScatterPlot(props){
    const{offsetX, offsetY, data, height, width, 
        selectedStation, setSelectedStation,
        setTooltipLeft,  setTooltipTop} = props;
    const xScale = Scales.linear(min(data, d=>d.Released_Year)-1,max(data, d=>d.Released_Year)+1,0, width);
    const yScale = Scales.linear(min(data, d=>d.IMDB_Rating)-1,max(data, d=>d.IMDB_Rating)+0.5,height, 0);
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
             <Points data={data} xScale={xScale} yScale={yScale} height={height} width={width} 
            selectedStation={selectedStation} setSelectedStation={setSelectedStation}
            setTooltipLeft={setTooltipLeft} setTooltipTop={setTooltipTop}/>
            <YAxis yScale={yScale} height={height} axisLabel={"IMDB_Rating"}/>
            <XAxis chartType={"scatter"} xScale={xScale} height={height} width={width} axisLabel={"Year"}/>
        </g>
    
}