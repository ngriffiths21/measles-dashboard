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

The United States has had a surge of measles cases in 2025. Back in July, Your Local Epidemiologist wrote:

> **Measles is a canary in the coal mine**. When measles reappears in a country like the U.S., it signals that something has gone seriously wrong. This is a disease we had essentially eliminated—thanks to one of the safest and most effective vaccines in the history of medicine. But the way things are heading, the U.S. is at risk of losing its elimination status this year.

That article, like much other coverage, accurately noted that most individuals are not at risk for Measles, and that although it can be deadly or severe in some cases, many fully recover. Local leaders in town health departments, hospitals, and schools already have a standard playbook they use to respond to local cases of reportable illnesses, and they can also draw on resources provided at the state and federal levels. All these factors are good reasons to think of Measles as a problem that isn't devastating today, but that signals problems in the health system that could become much more serious if left unaddressed.

Unfortunately, we are already at a point where this view is inadequate for most local leaders, even if it remains very appropriate for a more general public audience. Local leaders should *not* think of Measles as a routine infectious disease. If they do, they will almost certainly underestimate the impacts of even a single incident case, leading to an ineffective response and potentially missing opportunities to prevent a small number of severe illnesses and deaths.

## Measles is unusually contagious, and the vaccine is unusually effective

The CDC Pink Book notes that people born before 1957 can be assumed immune to Measles. This is because they *almost certainly got it as a child*.[^5]

About half of children got measles by age 6, 90% of the population got it by age 15. To get it, you didn't need to touch infected surfaces or have someone cough in your face. The virus is airborne; it can be enough to walk into a room *hours after* an infected child was there. It is often estimated that if no one had immunity, the average infected person would infect 12-18 other people. Estimates vary widely, with some much higher estimates in the literature as well[^11]; regardless, it is surely one of the most contagious diseases in the world.

[^11]: [The basic reproduction number (R0) of measles: a systematic review](https://pubmed.ncbi.nlm.nih.gov/28757186/)


[^5]: CDC, Pink Book, [Chapter 13: Measles](https://www.cdc.gov/pinkbook/hcp/table-of-contents/chapter-13-measles.html).

The pre-vaccination period was marked by a fairly steady, extremely high number of cases, but there were dramatic improvements to medical care and nutrition and these led to a decrease in the mortality rate. For example, in 1926 there were 8,607 deaths from measles, with 6,746 among children less than 5 years old. In contrast, from 1956-1960 there were an average of 450 measles deaths per year.[^7]

*editing note: could consider shortening/moving this note about the mortality rate*.


[^6]: CDC, [Mortality Statistics, 1926](https://www.cdc.gov/nchs/data/vsushistorical/mortstatsh_1926.pdf); U.S. Census, [Population Estimates, 1926](https://www2.census.gov/programs-surveys/popest/tables/1900-1980/national/asrh/pe-11-1926.pdf)

[^7]: [Measles Elimination in the United States](https://academic.oup.com/jid/article-abstract/189/Supplement_1/S1/820569)

Then the first vaccine was licensed in 1963. It was ridiculously effective. Initially the recommendation was to get a single dose of vaccine, and this was not a maximally effective schedule, but nevertheless resulted in an over 95% decrease in the number of annual cases. In 1989 it was recommended to get two doses, and this led to elimination of the disease in 2000.[^5] Today, outbreaks only occur in areas with lower than average vaccination rates, and cases in vaccinated or immune people are very rare.

**To an unusual degree, the outcome of an exposure to measles is determined by vaccination status**. If you aren't vaccinated, you'll probably get it, and if you are, you won't. Vaccination status is so important that it drowns out basically all other factors.

Note that measles is normally a childhood disease, though the reasons for this have shifted over time. Before the vaccine, *basically all children got it*, and this made them immune from being reinfected later in life. These days, most adults are vaccinated, and if vaccination rates decline in an area it will be children who are most vulnerable in the case of an outbreak.

## Measles illness is fairly severe

As of November 4th, 2025, there were just under 1,700 confirmed cases in the U.S. for the year; this was enough to cause 200 hospitalizations (12% of cases) and 3 deaths. For comparison, one CDC study[^2] estimated that 5.7% of COVID-19 cases were hospitalized in the pre-vaccine period. (The rate in that study varies wildly by age, though. And of course it would have decreased once people got vaccinated, because many vaccinated people got infected but with more mild cases).

Measles has a range of impacts. It infects immune system cells and can lead to complications like pneumonia, diarrhea, and more rarely, encephalitis, which often results in neurological problems. Measles infection can also cause a long-term suppression of the immune system in which the immune system is thought to lose cells that provide immunity to prior infections and vaccinations.[^3]

[^2]: [Estimates of SARS-CoV-2 Hospitalization and Fatality Rates in the
    Prevaccination Period, United
    States](https://wwwnc.cdc.gov/eid/article/30/6/23-1285_article)

[^3]: StatPearls, [Measles](https://www.ncbi.nlm.nih.gov/books/NBK448068/).

Overall, the story of measles morbidity and mortality right now is one about a relatively small number of people at risk, and many people who are completely immune, but a serious problem nonetheless because of fairly severe impacts for those who are infected. This contrasts with diseases like COVID-19 and influenza which are more mild illnesses on average but affect huge numbers of people.

## Rapid response can save lives



## What is happening in my community now?

### Local patterns determine impact

The current outbreak is the largest number of cases in a year since 1992[^1], when measles cases were on the decline and the U.S. was making progress towards eradicating the disease. Measles was declared eliminated in 2000.

The outbreak originated in West Texas and spread to New Mexico, Oklahoma, and Kansas. This is still the largest outbreak so far. More recently, outbreaks started in Arizona, Utah and South Carolina.

[^1]: CDC, [Measles Cases and
    Outbreaks](https://www.cdc.gov/measles/data-research/index.html). 

In Gaines County, Texas, there is a large Old Colony Mennonite community with low vaccination rates. This community is fairly isolated from mainstream society, has a highly conservative ideology, uses minimal modern technology, and speaks a dialect of Low German; for all these reasons (and more), the community does not have much of a relationship with the medical system.[^4] We do not know exactly what the vaccination rate is in Gaines County, but it is clear that it is much lower than average.

[^4]: [Measles outbreaks in the United States in 2025: Practice, policy, and the canary in the coalmine](https://pmc.ncbi.nlm.nih.gov/articles/PMC12135429/).

**Local vaccination rates** are very important to understand susceptibility to an outbreak, and in some places they are dramatically  lower than the national average.

These local patterns are more important than the national statistics. The number of Kindergarteners without full vaccination has increased slightly in the past few years, but not enough to be a dramatic problem. The national immunity rate remains quite high (around 95%, [according to WHO](https://immunizationdata.who.int/global/wiise-detail-page/measles-vaccination-coverage?CODE=USA&ANTIGEN=MCV2&YEAR=)). In fact, significant gains in the national vaccination rate have been made since 2000, when Measles was declared eliminated from the U.S. Most people are vaccinated with two doses at a young age and considered immune for life, so when vaccination rates change, it is reflected first in younger age cohorts, and only gradually in the national rate.

*Editing: talk more about current vaccination rates here. What does low mean? what is average nationally?*

### Global risk changes over time

Gaines County, Texas started off with no measles cases and is surrounded by areas with better vaccination rates. We can't be sure, but the outbreak seems likely to have come from overseas. In fact there were two cases in Houston early in the year linked to travel.[^10]

*Editing: add example of places with low vaccination that avoided outbreaks so far*

[^10]: Texas Health and Human Services, [Confirmed Case of Measles - January 2025](https://www.dshs.texas.gov/news-alerts/confirmed-case-measles-january-2025)

There are a handful of countries around the world with unusually low vaccination rates and very large recent outbreaks. For example, Romania reported over 30,000 cases in 2024 and the outbreak has been continuing this year.[^8] According to WHO, the vaccination rate there (first dose) has declined from around 98% in 2000 to under 70% last year. There has been an influential and growing anti-vaccination movement there, making it difficult to improve coverage.

[^8]: UNICEF, [European Region reports highest number of measles cases in more than 25 years](https://www.unicef.org/press-releases/european-region-reports-highest-number-measles-cases-more-25-years-unicef-whoeurope)

[^9]: WHO, [Measles vaccination coverage data](https://immunizationdata.who.int/global/wiise-detail-page/measles-vaccination-coverage)

Large outbreaks overseas have a big impact on local risk of an outbreak. Even though relatively few people travel overseas, each one transmits some amount of risk of starting an outbreak when they return back home. Since measles is so contagious, it is often sufficient for a single person to get infected overseas and then travel to a community with low vaccination.

Also, most cases happened early in the year, which is typical: the disease is highly seasonal with cases typically peaking in winter and spring. So, this year's summer months may have had fewer cases than the first half of the year, but were still quite high when you consider the seasonal pattern. Compared to previous years, the outbreak still looks like it's going strong.

### Possible scenarios

Locally, there are basically four possible situations you might be in.

Some places see a pattern of **intermittent sparks**. For example, here in Boston, it is known that someone with measles visited for a couple days back in June. Sometimes cases show up, and thinking of each one like a spark, they don't really catch because nearly everyone they encounter is immune. Occasionally there may be a tiny cluster that doesn't spread any further. This is the current state of most of the U.S., and it is basically the best we can aim for right now; to go further requires better global control.

A small number of places are in a state of **rapid outbreak**. This is the dreaded epi curve, like this one from Gaines County: [insert graph]

Typically this signifies that there is a community with vaccination rates well below average, and probably well below 90%. Once they get going, outbreaks in areas like this can be exceptionally difficult to control, because measles is just too contagious for the standard public health playbook to keep up (this includes isolation of active cases, contact tracing, notification and rapid vaccination of those who are exposed).

A few other places are in a state of **unmaterialized outbreak**. This is just West Texas in late 2024; it hasn't happened yet, because the index case hasn't yet arrived. If your community is in this situation, the best way to avoid a rapid outbreak is to materially increase the vaccination rate. This is very hard work, sometimes beyond the public health system's capabilities, but sometimes it can be done.

Finally, there are some communities with a pattern of **unsteady spread**. For example,

*add example*

This pattern is marked by some active transmission between unvaccinated people in the area, but a low enough proportion of susceptible individuals that spread remains very slow.

These are places with the biggest opportunity for public health to make a difference. Prevention efforts are effective, because even small improvements to the vaccination rate can help move to the intermittent sparks regime. Response efforts are more effective than during rapid outbreaks because there is more time to ramp them up and less dramatic interventions can still materially improve the outcome.

*Since these are important, list them*

### Response

*case studies*

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


${resize((width) => mapPlotZoom(cases_county, nation, states, {width}))}

## Data notes
