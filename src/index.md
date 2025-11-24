---
theme: light
title: "Measles response: There is much more we can do"
toc: true
---

```js
import {casePlot, vaxPlot, mapPlotZoom} from "./components/plot.js";
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
const states = FileAttachment("data/states.json").json({typed: true});
```

# Measles response: There is much more we can do

*By Nicholas Griffiths*

*November 20, 2025*

The United States has had a surge of measles cases in 2025. On July 11, 2025, [Your Local Epidemiologist](https://yourlocalepidemiologist.substack.com/p/its-not-just-about-measles) wrote:

> **Measles is a canary in the coal mine**. When measles reappears in a country like the U.S., it signals that something has gone seriously wrong. This is a disease we had essentially eliminated—thanks to one of the safest and most effective vaccines in the history of medicine. But the way things are heading, the U.S. is at risk of losing its elimination status this year.

That article, like much other coverage, accurately noted that the scale and impact of Measles outbreaks today is lower than influenza and COVID, since so many people are immune. Local leaders in town health departments, hospitals, and schools already have a standard playbook they use to respond to local cases of reportable illnesses, and they can also draw on resources provided at the state and federal levels. All these factors are good reasons to think of Measles as a problem that isn't devastating today, but that signals problems in the health system that could become much more serious if left unaddressed.

This is an appropriate view for a general public audience, but it is inadequate for local leaders. Local leaders should not think of Measles as a routine infectious disease. If they do, they will almost certainly underestimate the impacts of even a single incident case, leading to an ineffective response and potentially missing opportunities to prevent a small number of severe illnesses and deaths.


<div class="card" style="max-width: 600px;">
  ${resize((width) => casePlot(cases, width))}
</div>


## Measles brings unusual challenges and opportunities

### Unusually contagious, unusually preventable

The CDC Pink Book notes that people born before 1957 can be assumed immune to Measles. This is because they almost certainly got it as a child.[^5]

About half of children got measles by age 6, and 90% of the population got it by age 15. It spreads much easier than other diseases, which involve contact with infected surfaces, or tiny droplets from a nearby cough; this virus is airborne, and it can be enough to walk into a room hours after an infected child was there. It is often estimated that if no one had immunity, the average infected person would infect 12-18 other people. Estimates vary widely, with some much higher estimates in the literature as well[^11]; regardless, it is surely one of the most contagious diseases in the world.

[^11]: [The basic reproduction number (R0) of measles: a systematic review](https://pubmed.ncbi.nlm.nih.gov/28757186/)


[^5]: CDC, Pink Book, [Chapter 13: Measles](https://www.cdc.gov/pinkbook/hcp/table-of-contents/chapter-13-measles.html).

In the years before the vaccine, there were a fairly steady, extremely high number of cases, but there were also dramatic improvements to medical care and nutrition, and these led to a decrease in the mortality rate. For example, in 1926 there were 8,607 deaths from measles, with 6,746 among children less than 5 years old. In contrast, from 1956-1960 there were an average of 450 measles deaths per year.[^7]

[^6]: CDC, [Mortality Statistics, 1926](https://www.cdc.gov/nchs/data/vsushistorical/mortstatsh_1926.pdf); U.S. Census, [Population Estimates, 1926](https://www2.census.gov/programs-surveys/popest/tables/1900-1980/national/asrh/pe-11-1926.pdf)

[^7]: [Measles Elimination in the United States](https://academic.oup.com/jid/article-abstract/189/Supplement_1/S1/820569)

Then the first vaccine was licensed in 1963. It was extremely successful. Initially the recommendation was to get a single dose of vaccine, and this was not a maximally effective schedule, but nevertheless resulted in an over 95% decrease in the number of annual cases. In 1989 it was recommended to get two doses, and this led to elimination of the disease in 2000.[^5] Today, outbreaks only occur in areas with lower than average vaccination rates, and rarely impact people who are vaccinated or immune.

**To an unusual degree, the outcome of an exposure to measles is determined by vaccination status**. If the person isn't immune, they will probably get sick. If vaccinated, they won't.

Importantly, Measles is also amenable to post-exposure prophylaxis, meaning vaccination after a person is exposed. The CDC recommends vaccination up to 72 hours after exposure for all those who are not already immune.[^12]

[^12]: CDC, [Measles Vaccine Recommendations](https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html).

This works because measles has a longer incubation period than many other diseases, with typically more than 10 days between first exposure and the appearance of any symptoms. The first signs are usually some combination of fever, cough, runny nose and pink eye. Then the characteristic rash appears a few days after initial symptoms. Measles patients are most contagious around 4 days before the rash starts and up to 4 days after it ends. Because the incubation period is so long and because it takes more than a week to become contagious, it is a good idea to get vaccinated soon after exposure, in order to halt or weaken the infection before it has time to develop.

Note that measles is normally a childhood disease, though the reasons for this have shifted over time. Before the vaccine, nearly all children got infected, and this made them immune from being reinfected later in life. These days, most adults are vaccinated or immune; if vaccination rates decline in an area, it will be the unvaccinated children who are most vulnerable in the case of an outbreak.

### The illness is fairly severe

As of November 4th, 2025, there were just under 1,700 confirmed cases in the U.S. for the year. This was enough to cause 200 hospitalizations (12% of cases) and 3 deaths. For comparison, one CDC study[^2] estimated that 5.7% of COVID-19 cases were hospitalized in the pre-vaccine period.[^14]

[^14]: The rate in that study varies wildly by age, however. And it would have decreased once people got vaccinated, because many vaccinated people got infected but had more mild cases than unvaccinated people.

Measles has a range of impacts. It infects immune system cells and can lead to complications like pneumonia, diarrhea, and more rarely, encephalitis, which often results in long-term neurological problems. Measles infection can also cause long-term suppression of the immune system, by destroying cells that can remember earlier infections and vaccinations and provide immunity against reinfection.[^3]

[^2]: [Estimates of SARS-CoV-2 Hospitalization and Fatality Rates in the
    Prevaccination Period, United
    States](https://wwwnc.cdc.gov/eid/article/30/6/23-1285_article)

[^3]: StatPearls, [Measles](https://www.ncbi.nlm.nih.gov/books/NBK448068/).

Overall, the story of measles morbidity and mortality is about a relatively small number of people who are currently at risk, and many people who are completely immune, but nonetheless it is a serious problem because those who get infected are impacted fairly severely. This contrasts with diseases like COVID-19 and influenza, which are more mild illnesses on average, but affect large numbers of people.

### Public health is not always this helpful

Many factors can hinder the public health system from succeeding in its goal to prevent disease and contain outbreaks:

- The disease spreads fast or asymptomatically so that resources like tests, contact tracing, and quarantine are much less effective
- It spreads slowly or is very mild, so that there isn't much urgency or political will
- It mutates quickly, leading to reinfection and making it difficult to develop a vaccine
- It is new and scientists don't have time to understand it

Measles not only falls on the better side of each of these factors, it is a nearly ideal version of them. It has a long incubation period; tests, quarantine, and prophylactic vaccination are highly impactful. Even a single case can make local news. It does not mutate rapidly,[^13] and has one of the most effective vaccines ever developed. It is very old, and well understood. All this means that public health intervention is very effective.

It also means that local leaders should be prepared to respond.

[^13]: This is somewhat surprising because the virus is similar to other viruses that mutate more quickly (it contains RNA, which is not as stable as DNA). [Some recent research](https://www.cell.com/cell-reports-medicine/fulltext/S2666-3791(21)00041-0) shows that the typical immune response to measles targets up to 8 sites on just one of its proteins, and suggests that even if several of the sites were changed by mutation, the immune system would have plenty of working antibodies left to neutralize the infection.

## Lowell Community Health Center

In November 2018, a sick child returned from a trip and was brought to an appointment at Lowell Community Health Center in Lowell, Massachusetts. She had contracted measles in a country where it was prevalent. There wasn't anything remarkable about the appointment or care of the patient herself; what was remarkable was what followed. Apoorva Mandavilli [wrote for Undark](https://undark.org/2019/04/29/measles-containment-infection-outbreak/):

> Indeed, the arrival of mother and child set off a chain of events and triggered longstanding but rarely tested protocols aimed at containing a measles outbreak. It involved hundreds of staff not just at the Lowell Community Health Center, but also the Massachusetts Department of Public Health (DPH), the City of Lowell Health Department, and the local hospital — with thousands of emails and a weeklong flurry of activity that strained the center’s capacities to the limit. They would need to figure out exactly who had been in the lobby, in the pharmacy, and in the pediatrics department during the crucial time window when the child with measles was in the facility. They would have to get back in touch with the nearly 550 people who may have been exposed as they moved through the center’s spaces, and locate enough vaccine supplies to immunize anyone who needed it, all within 72 hours of the initial exposure.

This is very different from the kind of response they would have mounted against a COVID or flu exposure. Partly this is because measles is wildly contagious, and a serious threat to anyone who crossed paths with the patient and was unvaccinated; partly it is because there was a lot that could be done to help.

In fact, in the aftermath of the exposure, some of the center's leaders wondered whether they had gone too far. They had run the emergency vaccine clinic for a total of six days after the exposure, twice as long as CDC recommends, and this took a huge toll on the center's staff. Surprisingly, the state didn't advise them to wind down the clinic earlier and it was ultimately the center itself that decided to close it. But it is very challenging to decide to close when even a late vaccine might help.

One surprise is that they also overestimated how much help they would get from the city and state:

> "I would have thought that the state department of public health or the city health department would have been leading the effort," says Levine. Realizing that the center would have to do the bulk of the work, she says, "that for me was like this 'oh my gosh' moment."

These health departments simply did not have the capacity to provide much more than advice. Most of the work of communicating, figuring out who was exposed, gathering vaccination information, and setting up and running a vaccine clinic was done by the health center.

Most schools, community centers, public transit systems, restaurants, libraries, camps, and other places where people congregate are at risk for a large-scale measles exposure some day, and these places are much less equipped to respond if that happens. But there are opportunities for local leaders in all these spaces to become better prepared.

## Understand what to expect in your community

### Local vaccination rates

The 2025 outbreak originated in West Texas and spread to New Mexico, Oklahoma, and Kansas. More recently, outbreaks started in Arizona, Utah and South Carolina.

[^1]: CDC, [Measles Cases and
    Outbreaks](https://www.cdc.gov/measles/data-research/index.html). 

```js
const mapTypeInput = Inputs.radio(["Cases", "Vaccination rate"], {value: "Cases"});
const mapType = Generators.input(mapTypeInput);
```

${display(mapTypeInput)}

${resize((width) => mapPlotZoom(mapType, cases_county, states, width))}

```js
let text;
if (mapType === "Cases") {
    text = html`Reported measles cases by county since January 2025. Data from <a href="https://github.com/CSSEGISandData/measles_data">JHU Measles Data Repository</a>. See data notes.`
} else if (mapType === "Vaccination rate") {
    text = html`Vaccination rate by county as of the 2022-23 school year. Data from <a href="https://github.com/CSSEGISandData/MMR_data">JHU Trends in County-Level MMR Vaccination</a>. County level data not available for all states. See data notes.`
}
```

> ${text}

Specifically, the outbreak first took off in Gaines County, Texas, where there is a large Old Colony Mennonite community with low vaccination rates. This community is fairly isolated from mainstream society, has a highly conservative ideology, uses minimal modern technology, and speaks a dialect of Low German; for all these reasons (and more), the community does not have a strong relationship with the medical system.[^4] We do not know exactly what the vaccination rate is in this community, but it is clear that it was much lower than average when the outbreak began.

[^4]: [Measles outbreaks in the United States in 2025: Practice, policy, and the canary in the coalmine](https://pmc.ncbi.nlm.nih.gov/articles/PMC12135429/).

Health leaders often set a target of 95% for vaccination coverage, which comes from modeling research that suggests this level is enough to naturally contain any outbreaks. The idea is that if someone sick with Measles comes from out of town, nearly everyone they contact will be immune, and even if they happen to spread it to one or two other people, there won't be enough unvaccinated people in the population to sustain transmission. If you live in an area with around 95% coverage you can assume an outbreak is unlikely.

This rule of thumb applies far more to **local vaccination rates** than to statewide or national data.

For example, the national data are not very concerning in isolation. The the number of Kindergarteners without full vaccination has increased slightly in the past few years, but not enough to be a dramatic problem. The national immunity rate remains quite high (around 95%, [according to WHO](https://immunizationdata.who.int/global/wiise-detail-page/measles-vaccination-coverage?CODE=USA&ANTIGEN=MCV2&YEAR=)). In fact, significant gains in the national vaccination rate have been made since 2000, when Measles was declared eliminated from the U.S. Most people are vaccinated with two doses at a young age and considered immune for life, so when vaccination rates change, it is reflected first in younger age cohorts, and only gradually in the national rate.

<div class="card" style="max-width: 600px;">
  ${resize((width) => vaxPlot(vax_us, width))}
</div>


### Global risk and seasonality

Gaines County, Texas started off with no measles cases and is surrounded by areas with better vaccination rates. We can't be sure, but the outbreak seems likely to have come from overseas. In fact there were two cases in Houston early in the year linked to travel.[^10]


[^10]: Texas Health and Human Services, [Confirmed Case of Measles - January 2025](https://www.dshs.texas.gov/news-alerts/confirmed-case-measles-january-2025)

There are a handful of countries around the world with unusually low vaccination rates and very large recent outbreaks. For example, Romania reported over 30,000 cases in 2024 and the outbreak has been continuing this year.[^8] According to WHO, the vaccination rate (first dose) has declined from around 98% in 2000 to under 70% last year. There has been an influential and growing anti-vaccination movement there, making it difficult to improve coverage.

[^8]: UNICEF, [European Region reports highest number of measles cases in more than 25 years](https://www.unicef.org/press-releases/european-region-reports-highest-number-measles-cases-more-25-years-unicef-whoeurope)

[^9]: WHO, [Measles vaccination coverage data](https://immunizationdata.who.int/global/wiise-detail-page/measles-vaccination-coverage)

**Large outbreaks overseas have a big impact on local risk of an outbreak.** Even though relatively few people travel internationally, each one transmits some amount of risk of starting an outbreak when they return back home. Since measles is so contagious, it is often sufficient for a single person to get infected abroad and then travel to a community with low vaccination.

Another pattern is seasonal: most cases happen early in the year, typically peaking in winter and spring. In fact, this year's summer months may have had fewer cases than the first half of the year, but were still quite high compared to the same months in previous years.

## Prepare for possible scenarios

Loosely speaking, there are three situations a community might be in.

Some places see a pattern of **intermittent sparks**. For example, here in Boston, it is known that someone with measles visited for a couple days back in June. In places like this the vaccination rate is very high, around 95% or even higher. Sometimes cases appear, and thinking of each one like a spark, they don't really ignite because nearly everyone they encounter is immune. Occasionally there may be a tiny cluster that doesn't spread any further. This is the current state of a lot of the U.S.

It is tempting to treat measles as benign in these areas, but even a single case can call for a vigorous response, and vigorous responses require preparation. It is worth asking and answering questions like:

- Do I know who is vaccinated or immune in my school, health center, community organization, etc.? If I needed to find this information out, would I be able to?
- Is it possible that there is a subgroup with a low vaccination rate, and at risk for rapid transmission, even if my town overall is well protected?
- If my organization were exposed to measles, would we be prepared to identify who exactly was exposed? Could we help affected people get vaccinated as quickly as possible? Are we connected with the local health department, hospitals, and other resources in a way that would help? If health departments are understaffed and unable to provide much help, what steps could we take on our own?

Next, a small number of places are already in a state of **sustained outbreak**. This is what happened in West Texas early this year. It signifies that there is a community with vaccination rates well below average, and probably well below 90%. Once outbreaks like this grow, they can be exceptionally difficult to control, particularly if the community remains hesitant to get vaccinated. Raising the local vaccination rate remains the single most important tool to reduce the scale of an outbreak, and should be done as quickly as possible. Contact tracing and post-exposure vaccination are also helpful.

Other communities are in a state of **unmaterialized outbreak**. This is just West Texas in late 2024; a relatively small number of cases will be sufficient to ignite an outbreak, but it hasn't happened yet, because the index case hasn't yet arrived. If your community is in this situation, the same principle applies: the strongest tool available is to increase the local vaccination rate. This is hard work, but worthwhile given ongoing outbreaks that could spread locally at any time.

## A little is better than none at all

Trying to emulate the response of a well-staffed community health center may seem out of touch with the reality of what community organizations are capable of. But when a case appears, the contagiousness and severity of the disease will make it feel urgent, no matter where it occurs. The leaders involved will quickly feel pressure to act, and even small actions—for example, simply being aware that an unvaccinated person should get a vaccine soon after exposure—could save a life.

---

## Data notes

Weekly measles cases: CDC, [Measles Cases and Outbreaks](https://www.cdc.gov/measles/data-research/index.html), section titled "Weekly measles cases by rash onset date." This data includes *confirmed* cases, meaning they must either be epidemiologically linked to a previous case, or confirmed via lab testing. Some cases are missed by this reporting process.

County level measles cases: [JHU Measles Tracking Team Data Repository](https://github.com/CSSEGISandData/measles_data/) at Johns Hopkins University. Data are compiled individually from state and county authorities and local news reports.

Vaccination rate among Kindergartners: CDC data table, [Vaccination Coverage and Exemptions among Kindergartners](https://data.cdc.gov/Vaccinations/Vaccination-Coverage-and-Exemptions-among-Kinderga/ijqb-a7ye/about_data).

County level measles vaccination: [JHU Trends in County-Level MMR Vaccination](https://github.com/CSSEGISandData/MMR_data) by Ensheng Dong, Samee Saiyed, Andreas Nearchou, Yamato Okura, and Lauren M. Gardner at Johns Hopkins.
