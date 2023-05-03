import React from "react";
import * as d3 from 'd3';

const WIDTH = 1225;
const HEIGHT = 480;
const margin = { top: 200, right: 40, bottom: 60, left: 80 };

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function removeDuplicates(data){
    const temp = data.map(d => d.station)
    return temp.filter((d, idx) => temp.indexOf(d) === idx);
}

function Cell({ d, xScale, yScale, color }){
    return <g transform={`translate(${xScale(d.station)}, ${yScale(d.month)})`} >
        </g>
}

function Legend() {
    return <g>
        </g>
}


export function Heatmap(props){

    const data = useData(props);
    if (!data) {
        return <pre>Loading...</pre>;
    };
    const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const STATION = removeDuplicates(data);
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left -margin.right;
    return
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            {data.map(d =>{
                return <Cell />
            })}
            <Legend />
        </g>
}