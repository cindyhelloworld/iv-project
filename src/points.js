import React from "react";

const color = 'white'
const changecolor = 'white'

export function Points(props){
const {data, xScale, yScale, height, width, 
    selectedStation, setSelectedStation, setTooltipLeft,  setTooltipTop} = props;
const getColor = (selectedStation, station) => {
    if (station === selectedStation){return changecolor
    }else{return "steelblue"}
}
const getRadius = (selectedStation, station) =>  {
    if (station === selectedStation){return 8
    }else{return 4}
}
if (selectedStation === null){
    return <g>
        {data.map(d => <circle key={d.Series_Title} cx={xScale(d.Released_Year)} 
        cy={yScale(d.IMDB_Rating)} r={getRadius(selectedStation, d.Series_Title)} stroke={color}
        fill={getColor(selectedStation, d.Series_Title)} 
        onMouseEnter={(event)=> {setSelectedStation(d.Series_Title);setTooltipLeft(event.pageX); setTooltipTop(event.pageY)}} 
        onMouseOut={()=> {setSelectedStation(null);setTooltipLeft(null); setTooltipTop(null)}}/>
        )}
    </g>
}else{
    return <g>
        {/* keep the original data the same */}
        {data.map(d => <circle key={d.Series_Title} cx={xScale(d.Released_Year)} 
        cy={yScale(d.IMDB_Rating)} r={getRadius(selectedStation, d.Series_Title)} stroke={color}
        fill={getColor(selectedStation, d.Series_Title)} />
        )}
        <rect key="cover" x={0} y={0} width={width} height={height} fill={"grey"} opacity={0.5}/>
        {data.filter(d => d.Series_Title===selectedStation)
             .map(d => <circle key={d.station+"S"} 
                cx={xScale(d.Released_Year)}
                cy={yScale(d.IMDB_Rating)}
                r={getRadius(selectedStation, d.Series_Title)} 
                stroke={color}
                fill={getColor(selectedStation, d.Series_Title)} 
                onMouseEnter={(event) => {setSelectedStation(d.Series_Title);
                    setTooltipLeft(event.pageX); setTooltipTop(event.pageY)}} 
                onMouseOut={()=> {setSelectedStation(null);
                    setTooltipLeft(null); setTooltipTop(null)}}/>)
        }
    </g>
}


}

