import React from "react";
import { max } from 'd3';
import { Scales } from "./scale";
import { Points } from "./points";
import { XAxis, YAxis } from "./axes";


export function ScatterPlot(props){
    const{offsetX, offsetY, data, height, width} = props;
    const xScale = Scales.linear(0,max(data, d=>d.Released_Year),0, width);
    const yScale = Scales.linear(0,max(data, d=>d.IMDB_Rating),height, 0);
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Points data={data} xScale={xScale} yScale={yScale} height={height} width={width} />
            <YAxis yScale={yScale} height={height} axisLabel={"Year"}/>
            <XAxis chartType={"scatter"} xScale={xScale} height={height} width={width} axisLabel={"IMDB_Rating"}/>
        </g>
    
}