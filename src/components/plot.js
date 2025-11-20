import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

export function casePlot(data, width) {
    return Plot.plot({
        title: "New measles cases per week, United States, 2023–2025",
        width,
        height: 150,
        y: { grid: false, label: "Cases" },
        x: { label: null },
        marks: [
            Plot.lineY(data, { y: "cases", x: "week_start" })
        ]
    })
}

export function vaxPlot(data, width) {
    return Plot.plot({
        title: "% of Kindergarteners without vaccination, United States, 2014–2024",
        width,
        height: 150,
        y: { domain: [0, 8], grid: false, label: "Unvaccinated %" },
        x: { label: null },
        marks: [
            Plot.lineY(data, { y: "Unvaccinated", x: "Year" })
        ]
    })
}

export function mapPlotZoom(countymesh, statemesh, width) {
    const color = d3.scaleQuantize([1, 10], d3.schemeReds[9]);
    const path = d3.geoPath(d3.geoAlbersUsa());

    const svg = d3.create("svg")
        .attr("width", `${width}`)
        .attr("viewBox", `0 0 975 610`)
        .attr("style", "height: auto;")
        .attr("overflow", "visible");

    // mapCanvas transforms under zoom, clipper clips contents
    const clipper = svg.append("svg")
        .attr("overflow", "invisible");
    const mapCanvas = clipper.append("g");
    
    // transforms under zoom but does not clip
    const textCanvas = svg.append("g")
    
    // provides hover event anchored coordinate system
    const textG = textCanvas.append("g");

    mapCanvas.selectAll("path") // draw counties and attach tooltip handler
        .data(countymesh.features)
        .join("path")
        .attr("fill", d => color(d.properties.cases))
        .attr("stroke", "#C0C0C0")
        .attr("stroke-width", 0.25)
        .attr("d", path)
        .on("mouseover", showToolTip)
        .on("mouseout", closeToolTip);

    mapCanvas.append("path") // draw states
        .datum(statemesh)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 0.5)
        .attr("d", path);
    
    const boundRect = [[0,0], [975, 610]];

    svg.call(d3.zoom().scaleExtent([1, 3]).translateExtent(boundRect).on("zoom", (ev) => {
        if (!isNaN(ev.transform.x)) {
            mapCanvas.attr("transform", ev.transform);
            textCanvas.attr("transform", ev.transform);
        }
    }));

    function showToolTip(ev) {
        const countyData = d3.select(ev.target).data()[0]; // access geo feature data
        if (countyData.properties === undefined) return;

        const countyName = countyData.properties.NAME + ", " + countyData.properties.STATE_NAME;
        const cases = countyData.properties.cases;
        const tooltipAnchorLoc = path.centroid(countyData);

        const anchorTransform = new d3.ZoomTransform(
            1 / d3.zoomTransform(svg.node()).k, // reverse the svg's scaling
            tooltipAnchorLoc[0],
            tooltipAnchorLoc[1]
        );

        textG.attr("transform", anchorTransform);

        textG.append("text")
            .attr("x", 20)
            .attr("y", -35)
            .text(`${countyName}`);

        textG.append("text")
            .attr("x", 20)
            .attr("y", -10)
            .text(`Cases: ${cases}`);

        // draw rectangle around text
        const textRect = textG.node().getBBox();

        textG.insert("rect", "text")
            .attr("x", `${textRect.x - 5}`)
            .attr("y", `${textRect.y - 5}`)
            .attr("width", `${textRect.width + 10}`)
            .attr("height", `${textRect.height + 10}`)
            .attr("fill", "white")
            .attr("stroke", "black")
            .node();
    }

    function closeToolTip(ev) {
        textG.selectAll("rect")
            .remove();
        textG.selectAll("text")
            .remove();
    }

    return svg.node();
}
