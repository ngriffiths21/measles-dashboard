---
theme: light
title: Measles Cases
toc: true
---

```js
import {casePlot, smallPlot} from "./components/casePlot.js";
import {utcParse} from "npm:d3-time-format";

const parseDate = utcParse("%Y");

function coerceTypes(d) {
  d.Year = parseDate(d.Year);
  return d;
}

const cases = FileAttachment("data/measles-cases.csv").csv({typed: true});
const vax_us = FileAttachment("data/vaccine-coverage-us.csv").csv({typed: true}).then((D) => D.map(coerceTypes));
```

# Measles Overview

## Recent data

<div class="grid grid-cols-2">
  <div>
  
  The United States has been seeing a surge of measles cases in 2025, beginning with a large outbreak in West Texas starting in January that spread to New Mexico, Oklahoma, and Kansas. This is still the largest outbreak to date. More recently, outbreaks started in Arizona, Utah and South Carolina.

  The number of Kindergarteners without full vaccination has increased slightly in the past few years. This probably doesn't fully explain these outbreaks, however, since the *national* immunity rate remains quite high (around 95%, [according to WHO](https://immunizationdata.who.int/global/wiise-detail-page/measles-vaccination-coverage?CODE=USA&ANTIGEN=MCV2&YEAR=)). In fact, significant gains in the national vaccination rate have been made since 2000, when Measles was declared eliminated from the U.S. Most people are vaccinated with two doses at a young age and considered immune for life, so when vaccination rates change, it is reflected first in younger age cohorts, and only gradually in the national rate.

  That being said, increasing vaccination is basically the *single* tool we have to combat this disease. Unlike other infectious diseases like Flu and Covid, the vaccine is both extraordinarily effective and *far more* effective in practice than any other intervention [**link to background concepts**].

  </div>
  <div>
    <div class="card">
      ${resize((width) => smallPlot(cases, "Cases", {width}))}
    </div>
    <div class="card">
      ${resize((width) => smallPlot(vax_us, "Vaccinations", {width}))}
    </div>
  </div>
</div>


```js
const outcome = view(Inputs.radio(["Vaccination", "Cases", "Hospitalization"], {label: "Outcome of interest:", value: "Vaccination"}));
```

```js
let durations;

if (outcome == "Cases") {
  durations = ["Past 3 months", "Past year", "Past 10 years"];
} else {
  durations = [];
}

const durationInput = Inputs.radio(durations, { label: "Duration" });
const duration = Generators.input(durationInput);
```

```js
let explainerText = "";

if (outcome == "Cases" && duration == "Past year") {
  explainerText = html`
    <p>Typically, cases rise in January and increase through the first half of the year, then decline.</p>
    <p>Here is another paragraph.</p>
  `;
}
```

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => casePlot(cases, outcome, duration, {width}))}
  </div>
  <div class="card">
    <p>${explainerText}</p>
  </div>

  ${durationInput}
</div>

## Looking ahead

## Data notes