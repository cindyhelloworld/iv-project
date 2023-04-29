import React from "react";

export function Points(props){
//     const {data, xScale, yScale, height, width} = props;
//     const getColor = () => {
//         return "steelblue"
//     }
//     const getRadius = () =>  {
//         return 5
//     }
//     return <g>
//     {data.map(d => <circle key={d.Series_Title} cx={xScale(d.Released_Year)} 
//     cy={yScale(d.IMDB_Rating)} r={getRadius()} stroke="black" 
//     fill={getColor()} />)}
//     </g>
// }
const {data, xScale, yScale, height, width, 
    selectedStation, setSelectedStation, setTooltipLeft,  setTooltipTop} = props;
const getColor = (selectedStation, station) => {
    if (station === selectedStation){return "red"
    }else{return "steelblue"}
}
const getRadius = (selectedStation, station) =>  {
    if (station === selectedStation){return 10
    }else{return 5}
}
if (selectedStation === null){
    return <g>
        {data.map(d => <circle key={d.Series_Title} cx={xScale(d.Released_Year)} 
        cy={yScale(d.IMDB_Rating)} r={getRadius(selectedStation, d.Series_Title)} stroke="black" 
        fill={getColor(selectedStation, d.Series_Title)} 
        onMouseEnter={(event)=> {setSelectedStation(d.Series_Title);setTooltipLeft(event.pageX); setTooltipTop(event.pageY)}} 
        onMouseOut={()=> {setSelectedStation(null);setTooltipLeft(null); setTooltipTop(null)}}/>
        )}
    </g>
}else{
    return <g>
        {/* keep the original data the same */}
        {data.map(d => <circle key={d.Series_Title} cx={xScale(d.Released_Year)} 
        cy={yScale(d.IMDB_Rating)} r={getRadius(selectedStation, d.Series_Title)} stroke="black" 
        fill={getColor(selectedStation, d.Series_Title)} />
        )}
        <rect key="cover" x={0} y={0} width={width} height={height} fill={"yellow"} opacity={0.5}/>
        {data.filter(d => d.Series_Title===selectedStation)
             .map(d => <circle key={d.station+"S"} 
                cx={xScale(d.Released_Year)}
                cy={yScale(d.IMDB_Rating)}
                r={getRadius(selectedStation, d.Series_Title)} 
                stroke="black"
                fill={getColor(selectedStation, d.Series_Title)} 
                onMouseEnter={(event) => {setSelectedStation(d.Series_Title);
                    setTooltipLeft(event.pageX); setTooltipTop(event.pageY)}} 
                onMouseOut={()=> {setSelectedStation(null);
                    setTooltipLeft(null); setTooltipTop(null)}}/>)
        }
    </g>
}


}

