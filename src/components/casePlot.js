import * as Plot from "npm:@observablehq/plot";

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
    return Plot.plot({
        projection: "albers-usa",
        width,
        height: 400,
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
    })
}
