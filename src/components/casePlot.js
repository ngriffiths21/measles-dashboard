import * as Plot from "npm:@observablehq/plot";

export function casePlot(data, outcome, {width}) {
    if (outcome == "Cases") {
        return Plot.plot({
            width,
            height: 300,
            y: {grid: true, label: "Cases"},
            marks: [
                Plot.lineY(data, {y: "cases", x: "week_start"}),
            ]
        });
    } else {
        return Plot.plot({
            marks: [
                Plot.frame(),
                Plot.text(["Not implemented yet"], {frameAnchor: "middle"})
            ]
        })
    }
}
