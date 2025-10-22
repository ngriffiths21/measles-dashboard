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

export function casePlot(data, outcome, duration, { width }) {
    if (outcome == "Cases" && duration == "Past year") {
        return Plot.plot({
            width,
            height: 300,
            y: { grid: true, label: "Cases" },
            marks: [
                Plot.lineY(data, { y: "cases", x: "week_start" }),
            ]
        });
    } else {
        return Plot.plot({
            marks: [
                Plot.frame(),
                Plot.text(["Not implemented yet"], { frameAnchor: "middle" })
            ]
        })
    }
}
