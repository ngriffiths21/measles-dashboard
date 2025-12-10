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
        title: "% of Kindergarteners who got vaccinated, United States, 2014–2024",
        width,
        height: 150,
        y: { domain: [80, 100], grid: false, label: "Vaccination rate" },
        x: { label: null },
        marks: [
            Plot.lineY(data, { y: "Estimate (%)", x: "Year", tip: { format: { x: (d) => `${d.getFullYear()}`, y: (d) => `${d}%`}} })
        ],
    })
}


function showToolTip(textG, type, path, textCanvas) {
    return ((ev) => {
        const countyData = d3.select(ev.target).data()[0]; // access geo feature data
        if (countyData.properties === undefined) return;

        const countyName = countyData.properties.NAME + ", "
            + countyData.properties.STATE_NAME;
        
        let value;
        if (type === "Cases") {
            value = countyData.properties.cases;
        } else {
            value = (countyData.properties.vaxrate * 100).toFixed(1) + "%";
            if (value === "0.0%") {
                value = "Not reported";
            }
        }
        const tooltipAnchorLoc = path.centroid(countyData);

        const anchorTransform = new d3.ZoomTransform(
            // reverse the outer canvas's scaling
            1 / d3.zoomTransform(textCanvas.node()).k, 
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
            .text(`${type}: ${value}`);

        // draw rectangle around text
        const textRect = textG.node().getBBox();

        textG.insert("rect", "text")
            .attr("x", `${textRect.x - 5}`)
            .attr("y", `${textRect.y - 5}`)
            .attr("width", `${textRect.width + 10}`)
            .attr("height", `${textRect.height + 10}`)
            .attr("fill", "white")
            .attr("stroke", "black");
    });
}

function closeToolTip(textG) {
    return ((_ev) => {
        textG.selectAll("rect")
            .remove();
        textG.selectAll("text")
            .remove();
    });
}


export function mapPlotZoom(type, countymesh, statemesh, width) {
    const colorCases = d3.scaleQuantize([1, 10], d3.schemeReds[9]);
    console.log(d3.schemeReds[9].reverse());
    const colorVaxScale = d3.scaleQuantize([0.6, 1], d3.schemeReds[9].toReversed());
    const colorVax = (input) => {
        if (input === 0) {
            return "#cccccc";
        }
        return colorVaxScale(input);
    }
    console.log(colorVax(0.1), colorVax(0.6));
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

    const showToolTipHandler = showToolTip(textG, type, path, textCanvas);
    const closeToolTipHandler = closeToolTip(textG);

    mapCanvas.append("g") // draw counties and attach tooltip handler
        .selectAll("path") 
        .data(countymesh.features)
        .join("path")
        .attr("stroke", "#C0C0C0")
        .attr("stroke-width", 0.25)
        .attr("d", path)
        .on("mouseover", showToolTipHandler)
        .on("mouseout", closeToolTipHandler);

    if (type === "Cases") {
        mapCanvas.selectAll("path")
            .attr("fill", d => colorCases(d.properties.cases))
    } else if (type === "Vaccination rate") {
        mapCanvas.selectAll("path")
            .attr("fill", d => colorVax(d.properties.vaxrate))
    }

    mapCanvas.append("g") // draw states
        .selectAll("path")
        .data(statemesh.features)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 0.5)
        .attr("d", path);
    
    const boundRect = [[0,0], [975, 610]];

    svg.call(d3.zoom().scaleExtent([1, 6]).translateExtent(boundRect).on("zoom", (ev) => {
        if (!isNaN(ev.transform.x)) {
            mapCanvas.attr("transform", ev.transform);
            textCanvas.attr("transform", ev.transform);
        }
    }));


    return svg.node();
}
