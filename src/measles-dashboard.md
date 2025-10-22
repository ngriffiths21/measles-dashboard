---
theme: dashboard
title: Measles Cases
toc: false
---

# Measles Cases


```js
import {casePlot} from "./components/casePlot.js";

const cases = FileAttachment("data/measles-cases.csv").csv({typed: true});
```

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