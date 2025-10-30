import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

export function smallPlot(data, outcome, { width }) {
    if (outcome == "Cases") {
        return Plot.plot({
            title: "New measles cases, United States, 2023–2025",
            width,
            height: 150,
            y: { grid: false, label: "Cases" },
            x: { label: null },
            marks: [
                Plot.lineY(data, { y: "cases", x: "week_start" })
            ]
        })
    } else if (outcome == "Vaccinations") {
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
}

export function mapPlotZoom(countymesh, nation, statemesh, { width }) {
    const color = d3.scaleQuantize([1, 10], d3.schemeReds[9]);
    const path = d3.geoPath(d3.geoAlbersUsa());

    const svg = d3.create("svg")
        .attr("width", `${width}`)
        .attr("viewBox", `0 0 975 610`)
        .attr("style", "height: auto;")
        .attr("overflow", "visible");

    svg.selectAll("path")
        .data(countymesh.features)
        .join("path")
        .attr("fill", d => color(d.properties.cases))
        .attr("stroke", "none")
        .attr("d", path)
        .on("mouseover", showToolTip)
        .on("mouseout", closeToolTip);

    svg.append("path")
        .datum(statemesh)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", "3")
        .attr("d", path);

    function showToolTip(ev) {
        const countyData = d3.select(ev.target).data()[0];
        if (countyData.properties === undefined) return;

        const countyName = countyData.properties.NAME + ", " + countyData.properties.STATE_NAME;
        const cases = countyData.properties.cases;
        const anchor_loc = path.centroid(countyData);

        const textG = svg.append("g")
            .attr("id", "tooltip");

        textG.append("text")
            .attr("x", anchor_loc[0] + 20)
            .attr("y", anchor_loc[1] - 35)
            .text(`${countyName}`);

        textG.append("text")
            .attr("x", anchor_loc[0] + 20)
            .attr("y", anchor_loc[1] - 10)
            .text(`Cases: ${cases}`);

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
        svg.select("#tooltip")
            .remove();
    }

    return svg.node();
}

export function mapPlot(data, nation, states, { width }) {
    const height = 400;
    const mplot = Plot.plot({
        projection: "albers-usa",
        width,
        height,
        color: {
            type: "threshold",
            domain: [1, 3, 10, 30, 100, 300],
            scheme: "reds",
            label: "Cases",
            legend: true
        },
        marks: [
            Plot.sphere(),
            Plot.geo(data, {
                fill: "cases",
                tip: true
            }),
            Plot.geo(nation),
            Plot.geo(states)
        ]
    });

    const mapSvg = mplot.childNodes[1];

    // Construct base container for map portion, excluding scale
    const baseSvg = d3.create("svg").node();
    mapSvg.replaceWith(baseSvg);
    baseSvg.append(mapSvg);
    d3.select(baseSvg).attr("viewBox", d3.select(mapSvg).attr("viewBox"));

    // The Plot default has a 0.5 pixel translation
    const rect = [[-0.5, -0.5], [width - 0.5, height - 0.5]];

    d3.select(baseSvg).call(d3.zoom().scaleExtent([1, 2]).translateExtent(rect).on("zoom", (ev) => {
        if (!isNaN(ev.transform.x)) {
            d3.select(mapSvg).attr('transform', ev.transform);
        }
    }));

    return mplot;
}
