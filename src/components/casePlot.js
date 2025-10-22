import * as Plot from "npm:@observablehq/plot";

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
