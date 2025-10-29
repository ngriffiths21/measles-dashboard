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

export function mapPlot(data, nation, states, zoomHandler, { width, scale }) {
    const projectn = d3.geoAlbersUsa();
    projectn.scale(projectn.scale() * scale);
    console.log("rendering, scale is", scale);

    const height = 400;
    const mplot = Plot.plot({
        projection: projectn,
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

    // d3.select(baseSvg).call(d3.zoom().scaleExtent([1, 2]).translateExtent(rect).on("zoom", (ev) => {
    //     if (!isNaN(ev.transform.x)) {
    //         d3.select(mapSvg).attr('transform', ev.transform);
    //     }
    // }));

    d3.select(baseSvg).call(d3.zoom().on("end", zoomHandler));
    return mplot;
}
