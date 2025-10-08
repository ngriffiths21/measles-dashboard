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

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => casePlot(cases, outcome, {width}))}
  </div>
</div>
