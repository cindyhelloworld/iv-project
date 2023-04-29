import React from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';
import { ScatterPlot } from './scatterplot';
import { BarChart } from './barchart';
import { Tooltip } from "./tooltip";
import 'bootstrap/dist/css/bootstrap.min.css';

//url
const csvUrl = "https://raw.githubusercontent.com/xxt9876543210/iv-project/master/data/cleaned_joint.csv"
//function for loading the data
function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(()=>{
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.Released_Year = +d.Released_Year;
                d.IMDB_Rating = +d.IMDB_Rating;
                d.revenue = +d.revenue;
                d.budget = +d.budget;
            });
            setData(data);
        });
    }, []);
    return dataAll;
};
// the Chart component
function Charts () {
    
    const [range, setMonth] = React.useState('4');
    const SVG_WIDTH = 500;
    const SVG_HEIGHT = 400;
    const margin = {left: 50, right:30, top:30, bottom:80};
    const width = SVG_WIDTH - margin.left - margin.right;
    const height = SVG_HEIGHT - margin.top - margin.bottom; 
    const [selectedStation, setSelectedStation] = React.useState(null);
    const [tooltipLeft, setTooltipLeft] = React.useState(null);
    const [tooltipTop, setTooltipTop] = React.useState(null);
    //the handler of the slider bar
    const changeHandler = (event) => {
        setMonth(event.target.value);
    }
    //loading the whole data set
    const dataAll = useData(csvUrl);
                if (!dataAll) {
                   return <pre>Loading...</pre>;
                };
    
    const YEAR = ['1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
    //get the monthly data
    const data = dataAll.filter( d => { 
        return d.range === YEAR[range] 
    });

    const dTooltip = data.filter(d => d.Series_Title===selectedStation)[0];
    
    return <div>
        <div>
            <input key="slider" type='range' min='0' max='9' value={range} step='1' onChange={changeHandler}/>
            <input key="monthText" type="text" value={YEAR[range]} readOnly/>
        </div>
        <div className='row'>
            <div className='col-lg-6'>
                <svg width={'100%'} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
                <ScatterPlot offsetX={margin.left} offsetY={margin.top} data={data} height={height} width={width}
            selectedStation={selectedStation} setSelectedStation={setSelectedStation}
            setTooltipLeft={setTooltipLeft} setTooltipTop={setTooltipTop}/>
                </svg>
                <Tooltip d={dTooltip} left={tooltipLeft} top={tooltipTop} />
            </div>
            <div className='col-lg-6'>
                <svg width={'100%'} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
                <BarChart offsetX={margin.left-5} offsetY={margin.top} height={height} width={width} data={data}/>
                </svg>
            </div>
        </div>
    </div> 
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Charts />, rootElement);