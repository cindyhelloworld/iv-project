import React from "react";

export { XAxis, YAxis };

const color = 'white'

function XAxis (props) {
    const {chartType, xScale, height, width, axisLabel} = props;

    if (chartType === "scatter") {
        return <g>
            {<line x1={0} y1={height} x2={width} y2={height} stroke={color}/>}
            {xScale.ticks().map(tickValue =>
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                    <line y2={8} stroke={color} />
                    <text style={{textAnchor: 'middle', fontSize:'11px', fill: color}} y={20}>
                        {tickValue}
                    </text>
                </g>
            )}
            <text style={{ textAnchor:'end', fontSize:'13px', fill: color}} transform={`translate(${width}, ${height-10})`}>
                {axisLabel}
            </text>
        </g>
    }

    
    if (chartType === "bar") {
        return <g>
            {<line x1={0} y1={height} x2={width} y2={height} stroke={color}/>}
            {xScale.domain().map(tickValue =>
                <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={height} />
                    <text style={{textAnchor: 'start', fontSize:'7px', fill: color}} y={height+3} transform={`rotate(70, 0, ${height+5})`}>
                        {tickValue}
                    </text>
                </g>
            )}
        </g>
    }
}

function YAxis(props) {
    const {yScale, height, axisLabel} = props;
    return <g>
        {<line y2={height} stroke={color}/>}
        {yScale.ticks().map(tickValue => 
            <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                <line x2={10} stroke={color} />
                <text style={{ textAnchor:'end', fontSize:'10px', fill: color}} >
                    {tickValue}
                </text>
            </g>
        )}
    <text style={{ textAnchor:'end', fontSize:'13px', fill: color}} transform={`translate(80, -10)rotate(0)`}>
        {axisLabel}
    </text> 
    </g>
    
}