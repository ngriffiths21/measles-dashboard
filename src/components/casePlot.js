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

    // The Plot default has a 0.5 pixel translation
    const rect = [[-0.5, -0.5], [width - 0.5, height - 0.5]];
    const mapSvg = d3.select(mplot.childNodes[1]);
    const mapGs = mapSvg.selectChildren();

    mapSvg.call(d3.zoom().scaleExtent([1, 5]).translateExtent(rect).on("zoom", (ev) => {
        if (!isNaN(ev.transform.x)) {
            mapGs.attr('transform', ev.transform);
        }
    }));

    return mplot;
}
