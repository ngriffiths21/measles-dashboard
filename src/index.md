---
theme: light
title: Measles Cases
toc: true
---

```js
import {casePlot, smallPlot, mapPlot, mapPlotZoom} from "./components/casePlot.js";
import {utcParse} from "npm:d3-time-format";
```

```js
const parseDate = utcParse("%Y");

function coerceTypes(d) {
  d.Year = parseDate(d.Year);
  return d;
}

const cases = FileAttachment("data/measles-cases.csv").csv({typed: true});
const vax_us = FileAttachment("data/vaccine-coverage-us.csv").csv({typed: true}).then((D) => D.map(coerceTypes));
const cases_county = FileAttachment("data/measles-cases-county.json").json({typed: true});
const nation = FileAttachment("data/nation.json").json({typed: true});
const states = FileAttachment("data/states.json").json({typed: true});

```

# Measles Overview

<div class="grid grid-cols-2"> <div>

## Recent Data

The United States has been seeing a surge of measles cases in 2025. It is
the largest number of cases in a year since 1992[^1], when measles cases
were on the decline and the U.S. was making progress towards eradicating
the disease. Measles was declared eliminated in 2000.

[^1]: CDC, [Measles Cases and
    Outbreaks](https://www.cdc.gov/measles/data-research/index.html). 
    
As of November 4th, 2025, there were just under 1,700 confirmed cases;
this was enough to cause 200 hospitalizations (12% of cases) and 3 deaths.
For comparison, one CDC study[^2] estimated that 5.7% of COVID-19 cases
were hospitalized in the pre-vaccine period. (The rate in that study
varies wildly by age, though. And of course it would have decreased once
people got vaccinated, because many vaccinated people got infected but
with more mild cases).

Measles has a range of impacts. It infects immune system cells and can
lead to complications like pneumonia, diarrhea, and more rarely,
encephalitis, which often results in neurological problems. Measles
infection can also cause a long-term suppression of the immune system in
which the immune system is thought to lose cells that provide immunity to
prior infections and vaccinations.[^3]

[^2]: [Estimates of SARS-CoV-2 Hospitalization and Fatality Rates in the
    Prevaccination Period, United
    States](https://wwwnc.cdc.gov/eid/article/30/6/23-1285_article)

[^3]: StatPearls,
    [Measles](https://www.ncbi.nlm.nih.gov/books/NBK448068/).

This year's surge began with a large outbreak in West Texas which spread
to New Mexico, Oklahoma, and Kansas. This is still the largest outbreak so
far. More recently, outbreaks started in Arizona, Utah and South
Carolina.

Most cases happened early in the year, which is typical: the disease is
highly seasonal with cases typically peaking in winter and spring. So,
this year's summer months may have had fewer cases than the first half of
the year, but were still quite high when you consider the seasonal
pattern. Compared to previous years, the outbreak still looks like it's
going strong.

Overall, the story of measles right now is one about a relatively small
number of people at risk, and many people who are completely immune, but
a serious problem nonetheless because of fairly severe impacts for those
who are infected. This contrasts with diseases like COVID-19 and influenza
which are more mild illnesses on average but affect huge numbers of
people.

## Vaccination

The number of Kindergarteners without full vaccination has increased
slightly in the past few years. This probably doesn't fully explain these
outbreaks, however, since the *national* immunity rate remains quite high
(around 95%, [according to
WHO](https://immunizationdata.who.int/global/wiise-detail-page/measles-vaccination-coverage?CODE=USA&ANTIGEN=MCV2&YEAR=)).
In fact, significant gains in the national vaccination rate have been made
since 2000, when Measles was declared eliminated from the U.S. Most people
are vaccinated with two doses at a young age and considered immune for
life, so when vaccination rates change, it is reflected first in younger
age cohorts, and only gradually in the national rate.
  
That being said, increasing vaccination is basically the *single* tool we
have to combat this disease. Unlike other infectious diseases like Flu and
Covid, the vaccine is both extraordinarily effective and *far more*
effective in practice than any other intervention [**link to background
concepts**].


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

### Cases by U.S. county

${resize((width) => mapPlotZoom(cases_county, nation, states, {width}))}


## Looking ahead



## Data notes
