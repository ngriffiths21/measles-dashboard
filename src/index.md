---
theme: light
title: "Preparing for measles at the local level"
toc: true
---

```js
import {casePlot, vaxPlot, mapPlotZoom} from "./components/plot.js";
import {timeParse} from "npm:d3-time-format";
```

```js
const parseDate = timeParse("%Y");

function coerceTypes(d) {
  d.Year = parseDate(d.Year);
  return d;
}

const cases = FileAttachment("data/measles-cases.csv").csv({typed: true});
const vax_us = FileAttachment("data/vaccine-coverage-us.csv").csv({typed: true}).then((D) => D.map(coerceTypes));
const cases_county = FileAttachment("data/measles-cases-county.json").json({typed: true});
const states = FileAttachment("data/states.json").json({typed: true});
```

# Preparing for measles at the local level

*Nicholas Griffiths*

*December 16, 2025*

The United States has had a surge of measles cases in 2025. In April, the New York Times [published an op-ed](https://www.nytimes.com/2025/04/02/opinion/measles-epidemic-texas.html) by Michael Mina, a leading measles expert at Harvard School of Public Health. He wrote:

> We used to think of measles outbreaks in the United States as isolated events: short-lived and confined to close-knit communities with low vaccination rates. A flare here, a bubble there. But as those bubbles grow and converge, the United States could be at risk for tens of thousands of cases.

Mina wants the U.S. to take the threat of measles seriously, for good reason: this is one of the most contagious diseases in the world, and it causes serious illness and death. The protection the U.S. worked so hard to achieve "is now unraveling," Mina writes—if vaccination rates don't improve, more people will needlessly die from a preventable disease. [Many](https://yourlocalepidemiologist.substack.com/p/its-not-just-about-measles) [other](https://www.statnews.com/2025/06/24/us-measles-elimination-status-vaccine-rates-cdc-mmr-rate/) [writers](https://www.usatoday.com/story/opinion/2025/03/04/measles-outbreak-texas-mmr-vaccine/81146579007/) have joined him in calling attention to the long-term consequences of measles resurgence.

These articles provide an overview of the problems that got us here, and a good list of things to work on, focusing on the national level. But the local picture is not like the national one. If your school, health center, or local organization gets exposed to measles, there is more you need to know. This disease is different from others in key ways, and surprisingly, there is a lot you can do even after an exposure.


<div class="card" style="max-width: 600px;">
  ${resize((width) => casePlot(cases, width))}

  <p>Updated December 10, 2025.</p>
</div>


## What makes measles different?

[CDC says](https://www.cdc.gov/pinkbook/hcp/table-of-contents/chapter-13-measles.html) that people born before 1957 can be assumed immune to measles. This is not because older people are less susceptible to infection,[^15] but because they were alive when measles was still so rampant that they almost certainly got it.

[^15]: Adults without immunity are not only as susceptible as kids, but also at greater risk for serious illness.

In those days, half of children got measles by age 6, and 90% of the population got it by age 15. It spreads much faster than other diseases, in part because of its transmission mechanism: while other viruses spread by contact with infected surfaces, or tiny droplets from a nearby cough, this one is airborne, and it can be enough to walk into a room hours after an infected child was there. It is often estimated that if no one had immunity, the average infected person would infect 12-18 other people. Estimates vary widely, with [some much higher estimates in the literature](https://pubmed.ncbi.nlm.nih.gov/28757186/) as well; in any case, it is surely one of the most contagious diseases in the world.[^16]

[^16]: The basic reproduction number (R0) of measles is often reported as 12-18, similar to [pertussis (12-17)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8489951/) and higher than [chickenpox (estimates vary widely, from around 4-16)](https://doi.org/10.1016/j.vaccine.2007.07.036). COVID-19 variants differed, with some Omicron variants [estimated as high as 20](https://doi.org/10.1016/j.abst.2023.09.002), but most below 10.

Measles is also a serious illness. For example, in 1926 there were 8,607 deaths from measles, with 6,746 among children less than 5 years old, making it one of the most deadly infectious diseases among children.[^6] In the following decades there were a fairly steady, extremely high number of cases, but there were also dramatic improvements to medical care and nutrition, and these led to a decrease in the mortality rate. From 1956-1960 there were an average of [450 measles deaths per year](https://academic.oup.com/jid/article-abstract/189/Supplement_1/S1/820569).

[^6]: On page 394 of the [Mortality Statistics report for 1926](https://www.cdc.gov/nchs/data/vsushistorical/mortstatsh_1926.pdf), there is a breakdown of U.S. infectious disease deaths by age, sex and race. This year was a particularly bad year for measles.

Today, medical care has improved further, but the disease continues to cause hospitalization, death, and long-term impacts. For example, as of November 4th, 2025, there were just under 1,700 confirmed cases in the U.S. since the start of the year. This was enough to cause 200 hospitalizations (12% of cases) and 3 deaths. For comparison, [one CDC study](https://wwwnc.cdc.gov/eid/article/30/6/23-1285_article) estimated that 5.7% of COVID-19 cases were hospitalized in the pre-vaccine period (this should be taken as a fairly imprecise comparison, though[^14]). The virus infects immune system cells and can lead to complications like pneumonia, diarrhea, and more rarely, encephalitis, which often results in long-term neurological problems. Measles infection can also cause long-term suppression of the immune system, by destroying cells that can remember earlier infections and vaccinations and provide immunity against reinfection.

[^14]: Estimating hospitalization and death rates is complex. The rate in the CDC study varies wildly by age, and it would have decreased once people got vaccinated, because many vaccinated people got infected but had more mild cases than unvaccinated people. Also, mild illnesses are far more likely to be unreported (for both measles and COVID-19, but especially for COVID-19) which tends to artificially raise estimated hospitalization rates.

The overall story of measles illness is that it is more severe than other viruses common today, and wildly contagious. But measles was pushed out of the spotlight for over 20 years.

### The vaccine

The first measles vaccine, licensed in 1963, was [extremely successful](https://www.cdc.gov/pinkbook/hcp/table-of-contents/chapter-13-measles.html). Initially the recommendation was to get a single dose of vaccine; this was not a great recommendation, but still managed to decrease annual cases by over 95%. In 1989 it was changed to two doses, and as vaccination rates continued to improve, the prevalence dropped further and the disease was declared eliminated in 2000. Today, outbreaks only occur in areas with lower than average vaccination rates, and rarely impact people who are vaccinated or immune.

**To an unusual degree, the outcome of an exposure to measles is determined by vaccination status**. If the person isn't immune, they will probably get sick. If vaccinated, they won't.

Importantly, measles is also amenable to post-exposure prophylaxis, meaning vaccination after a person is exposed. [CDC recommends](https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html) vaccination up to 72 hours after exposure for all those who are not already immune.

This works because measles has a longer incubation period than many other diseases, with typically more than 10 days between first exposure and the appearance of any symptoms. The first signs are usually some combination of fever, cough, runny nose and pink eye. Then the characteristic rash appears a few days after initial symptoms. Measles patients are most contagious around 4 days before the rash starts and up to 4 days after it ends. Because the incubation period is so long and because it takes more than a week to become contagious, it is a good idea to get vaccinated soon after exposure, in order to halt or weaken the infection before it has time to develop.

## Prompt response is unusually powerful

Many factors can hinder the public health system from succeeding in its goal to prevent disease and contain outbreaks:

- Some disease spreads fast or asymptomatically so that resources like tests, contact tracing, and quarantine are much less effective
- It spreads slowly or is very mild, so that there isn't much urgency or political will
- It mutates quickly, leading to reinfection and making it difficult to develop a vaccine
- It is new and scientists don't have time to understand it

Measles not only falls on the preferred side of each of these factors, it is a nearly ideal version of them. It has a long incubation period; tests, quarantine, and prophylactic vaccination are highly impactful. Even a single case can make local news. It does not mutate rapidly,[^13] and has one of the most effective vaccines ever developed. It is very old, and well understood. All this means that public health intervention is very effective.

It also means that local leaders should be prepared to respond.

[^13]: This is somewhat surprising because the virus is similar to other viruses that mutate more quickly (it contains RNA, which is not as stable as DNA). [Some recent research](https://www.cell.com/cell-reports-medicine/fulltext/S2666-3791(21)00041-0) shows that the typical immune response to measles targets up to 8 sites on just one of its proteins, and suggests that even if several of the sites were changed by mutation, the immune system would have plenty of working antibodies left to neutralize the infection.

### Lowell Community Health Center

In November 2018, a sick child returned from a trip and was brought to an appointment at Lowell Community Health Center in Lowell, Massachusetts. She had contracted measles in a country where it was prevalent. There wasn't anything remarkable about the appointment or care of the patient herself; the remarkable part was what followed. Apoorva Mandavilli [wrote for Undark](https://undark.org/2019/04/29/measles-containment-infection-outbreak/):

> Indeed, the arrival of mother and child set off a chain of events and triggered longstanding but rarely tested protocols aimed at containing a measles outbreak. It involved hundreds of staff not just at the Lowell Community Health Center, but also the Massachusetts Department of Public Health (DPH), the City of Lowell Health Department, and the local hospital — with thousands of emails and a weeklong flurry of activity that strained the center’s capacities to the limit. They would need to figure out exactly who had been in the lobby, in the pharmacy, and in the pediatrics department during the crucial time window when the child with measles was in the facility. They would have to get back in touch with the nearly 550 people who may have been exposed as they moved through the center’s spaces, and locate enough vaccine supplies to immunize anyone who needed it, all within 72 hours of the initial exposure.

This is very different from the kind of response they would have mounted against a COVID or flu exposure. Partly this is because measles is wildly contagious, and a serious threat to anyone who crossed paths with the patient and was unvaccinated; partly it is because there was a lot that could be done to help.

In fact, in the aftermath of the exposure, some of the center's leaders wondered whether they had gone too far. They had run the emergency vaccine clinic for a total of six days after the exposure, twice as long as CDC recommends, and this took a huge toll on the center's staff. Surprisingly, the state didn't advise them to wind down the clinic earlier and it was ultimately the center itself that decided to close it. But it is very challenging to decide to close when even a late vaccine might help.

One surprise is that they also overestimated how much help they would get from the city and state:

> "I would have thought that the state department of public health or the city health department would have been leading the effort," says Levine. Realizing that the center would have to do the bulk of the work, she says, "that for me was like this 'oh my gosh' moment."

City and state health departments simply do not have enough capacity to provide much more than advice. So the work of communicating, figuring out who was exposed, gathering vaccination information, and setting up and running a vaccine clinic had to be done by the health center.

Schools, community centers, public transit systems, restaurants, libraries, camps, and other places where people congregate are at risk for a large-scale measles exposure some day, and most of these places are far less equipped to respond than Lowell Community Health Center. But there are still opportunities for local leaders in these spaces to become better prepared.

## Understanding and controlling local outbreaks

The [2025 measles outbreak](https://www.cdc.gov/measles/data-research/index.html) originated in West Texas and spread to New Mexico, Oklahoma, and Kansas. More recently, outbreaks started in Arizona, Utah and South Carolina.

```js
const mapTypeInput = Inputs.radio(["Cases", "Vaccination rate"], {value: "Cases"});
const mapType = Generators.input(mapTypeInput);
```

<div class="card" style="max-width:600px;">
${display(mapTypeInput)}

${resize((width) => mapPlotZoom(mapType, cases_county, states, width))}

```js
let text;
if (mapType === "Cases") {
    text = html`Reported measles cases by county since January 2025. Updated December 12, 2025. Data from <a href="https://github.com/CSSEGISandData/measles_data">JHU Measles Data Repository</a>. See data notes.`
} else if (mapType === "Vaccination rate") {
    text = html`Vaccination rate by county as of the 2022-23 school year. Data from <a href="https://github.com/CSSEGISandData/MMR_data">JHU Trends in County-Level MMR Vaccination</a>. County level data not available for all states. See data notes.`
}
```

> ${text}
</div>

Specifically, the outbreak first took off in Gaines County, Texas, where there is a [large Old Colony Mennonite community](https://pmc.ncbi.nlm.nih.gov/articles/PMC12135429/) with low vaccination rates. This community is fairly isolated from mainstream society, has a highly conservative ideology, uses minimal modern technology, and speaks a dialect of Low German; for all these reasons (and more), the community does not have a strong relationship with the medical system. We do not know exactly what the vaccination rate is in this community, but it is clear that it was much lower than average when the outbreak began.

Health leaders often set a target of 95% for vaccination coverage, which comes from modeling research that suggests this level is enough to naturally contain any outbreaks. The idea is that if someone sick with measles comes from out of town, nearly everyone they contact will be immune, and even if they happen to spread it to one or two other people, there won't be enough unvaccinated people in the population to sustain transmission. If you live in an area with around 95% coverage you can assume an outbreak is unlikely.

This rule of thumb applies far more to **local vaccination rates** than to statewide or national data.

For example, the national data are not very concerning in isolation. The number of fully vaccinated Kindergarteners has dropped slightly in the past few years, but not enough to be a dramatic problem. The national immunity rate remains quite high (around 95%, [according to WHO](https://immunizationdata.who.int/global/wiise-detail-page/measles-vaccination-coverage?CODE=USA&ANTIGEN=MCV2&YEAR=)). In fact, significant gains in the national vaccination rate have been made since 2000, when measles was declared eliminated from the U.S. Most people are vaccinated with two doses at a young age and considered immune for life, so when vaccination rates change, it is reflected first in younger age cohorts, and only gradually in the national rate.

<div class="card" style="max-width: 600px;">
  ${resize((width) => vaxPlot(vax_us, width))}
</div>


Once an outbreak develops, it can be exceptionally difficult to control. It is particularly challenging if the local community remains hesitant to get vaccinated. Helping raise the local vaccination rate is the most important tool to reduce the scale of an ongoing outbreak, and should be attempted as quickly as possible. Contact tracing and post-exposure vaccination are also important.


## Understanding and preparing for local exposures

Gaines County, Texas started off with no measles cases and is surrounded by areas with better vaccination rates. The whole thing was kicked off by a single exposure to measles. We can't be sure, but the first case seems likely to have come from overseas. In fact there were [two cases in Houston](https://www.dshs.texas.gov/news-alerts/confirmed-case-measles-january-2025) early in the year linked to travel.

There are a handful of countries around the world with unusually low vaccination rates and very large recent outbreaks. For example, [Romania reported over 30,000 cases](https://www.unicef.org/press-releases/european-region-reports-highest-number-measles-cases-more-25-years-unicef-whoeurope) in 2024 and the outbreak has been continuing this year. [According to WHO](https://immunizationdata.who.int/global/wiise-detail-page/measles-vaccination-coverage), the vaccination rate (first dose) has declined from around 98% in 2000 to under 70% last year. There has been an influential and growing anti-vaccination movement there, making it difficult to improve coverage.

**Large outbreaks overseas have a big impact on local risk of an exposure.** Even though relatively few people travel internationally, each one transmits some amount of risk of bringing the disease with them when they return back home.

Another general pattern to emphasize is seasonal: most cases happen early in the year, typically peaking in winter and spring.[^17] In fact, this year's summer months may have had fewer cases than the first half of the year, but were still quite high compared to the same months in previous years.

[^17]: This is specific to the U.S., where indoor gatherings are more common in the winter months. Also, our travel patterns are most connected to other Northern hemisphere countries, so our seasonal patterns are aligned with theirs. Southern hemisphere and tropical countries have different patterns that reflect their local climate and travel patterns.

What happens after an exposure depends on the local vaccination rate. In some areas there is a pattern of **intermittent sparks**. For example, in Boston, it is known that [someone with measles visited](https://www.boston.gov/news/person-measles-visited-boston) for a couple days back in June. Most neighboring towns have vaccination rates around 95% or even higher. In areas like this, sometimes cases appear, and thinking of each one like a spark, they don't really ignite because nearly everyone they encounter is immune. Occasionally there may be a tiny cluster that doesn't spread any further. This is the current state of a lot of the U.S.

It is tempting to treat measles as benign in these areas, but even a single case can call for a vigorous response, and vigorous responses require preparation. It is worth asking and answering questions such as:

- Do I know who is vaccinated or immune in my school, health center, community organization, etc.? If I needed to find this information out, would I be able to?
- Is it possible that there is a subgroup with a low vaccination rate, and at risk for rapid transmission, even if my town overall is well protected?
- If my organization were exposed to measles, what would we be prepared to do?
  - Could we identify who exactly was exposed?
  - Could we help affected people get vaccinated as quickly as possible?
  - Are we connected with the local health department, hospitals, and other resources in a way that would help? If health departments are understaffed and unable to provide much help, what steps could we take on our own?

The next steps that make the most sense will vary between organizations, but these questions are a good start.

Other communities are in a state of **unmaterialized outbreak**. This is just West Texas in late 2024; with a low local vaccination rate and active global risk, a relatively small number of cases will be sufficient to ignite an outbreak. It hasn't happened yet, because the index case hasn't yet arrived. If your community is in this situation, just like the active outbreak scenario, the strongest tool available is to increase the local vaccination rate. This is hard work, but a worthwhile use of resources because even a small improvement can make a difference.


## A little is better than none at all

Trying to increase the vaccination rate or emulate the response of a well-staffed community health center may seem out of touch with the reality of what community organizations can do. But when a case appears, the contagiousness and severity of the disease will make it feel urgent, no matter where it occurs. There will be pressure to act, and even small actions—for example, simply being aware that an unvaccinated person should get a vaccine soon after exposure—could save a life.

---

*Nicholas Griffiths is an epidemiologist who previously worked at Massachusetts Department of Public Health and has an MPH from Boston University.*

*Comments: nick.griffiths.rc@gmail.com*

*Source code: <https://github.com/ngriffiths21/measles-dashboard>*

---

## Data notes

Weekly measles cases: CDC, [Measles Cases and Outbreaks](https://www.cdc.gov/measles/data-research/index.html), section titled "Weekly measles cases by rash onset date." This data includes *confirmed* cases, meaning they must either be epidemiologically linked to a previous case, or confirmed via lab testing. Some cases are missed by this reporting process.

County level measles cases: [JHU Measles Tracking Team Data Repository](https://github.com/CSSEGISandData/measles_data/) at Johns Hopkins University. Data are compiled individually from state and county authorities and local news reports.

Vaccination rate among Kindergartners: CDC data table, [Vaccination Coverage and Exemptions among Kindergartners](https://data.cdc.gov/Vaccinations/Vaccination-Coverage-and-Exemptions-among-Kinderga/ijqb-a7ye/about_data).

County level measles vaccination: [JHU Trends in County-Level MMR Vaccination](https://github.com/CSSEGISandData/MMR_data) by Ensheng Dong, Samee Saiyed, Andreas Nearchou, Yamato Okura, and Lauren M. Gardner at Johns Hopkins.

## Further reading and resources

CDC, Pink Book, [Chapter 13: Measles](https://www.cdc.gov/pinkbook/hcp/table-of-contents/chapter-13-measles.html).

StatPearls, [Measles](https://www.ncbi.nlm.nih.gov/books/NBK448068/).

CDC, [Measles Cases and
    Outbreaks](https://www.cdc.gov/measles/data-research/index.html).

Johns Hopkins, [Measles Tracker](https://publichealth.jhu.edu/ivac/resources/us-measles-tracker).

USA Today, [Vaccination and outbreak tracker](https://data.usatoday.com/projects/county-vaccination-coverage-and-measles-outbreaks/).
