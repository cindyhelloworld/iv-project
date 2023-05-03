import React from 'react';
import * as d3 from 'd3';

export function CreateGraph(props) {
    const { x, y, width, height, data } = props;
    const d3Selection = React.useRef();
    React.useEffect(() => {
        let nodes = d3.groups(data, d => d["Genre"])
            .map(d => { return { id: d[0], name: d[1][0]["Series_Title"], value: d[1].length } });
        console.log(nodes);
        const radius = d3.scaleLinear().range([1, 100])
            .domain([d3.min(nodes, d => d.value), d3.max(nodes, d => d.value)]);
        const color = (id) => {
            const n = +id[1];
            return d3.schemeCategory10[n];
        };
        const simulation = d3.forceSimulation(nodes)
            .velocityDecay(0.2)
            .force("x", d3.forceX([width / 2]).strength(0.02))
            .force("y", d3.forceY([height / 2]).strength(0.02))
            .force("collide", d3.forceCollide().radius(d => radius(d.value)));
        // .force("charge", d3.forceManyBody())
        // .force("centrer", d3.forceCenter( width/2, height/2));

        let g = d3.select(d3Selection.current);

        const node = g.append("g")
            .attr("stroke", "white")
            .attr("fill", "steelblue")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("g");

        node.append("circle")
            .attr("r", d => radius(d.value))
            .attr("fill", d => color(d.id))
            .call(drag(simulation));

        node.append("text")
            .text(d => d.id)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", "#000")
            .style("font-size", "10px")
            .style("font-weight", "lighter");

        simulation.on("tick", () => {
            node.attr("transform", d => `translate(${d.x},${d.y})`);
        });
        function drag(simulation) {
            function dragstarted(event) {
                console.log(event.subject);
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }
            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }
            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }
            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        };
    }, [width, height])
    return <g ref={d3Selection} transform={`translate(${x}, ${y})`}>
    </g>
}
