# Data

`src/data/measles-cases.csv`

CDC web page "Measles Cases and Outbreaks," section titled "Weekly measles cases by rash onset date." Accessed via CSV download link. https://www.cdc.gov/measles/data-research/index.html.

`data/vaccine-coverage.csv`

CDC data table "Vaccination Coverage and Exemptions among Kindergartners." https://data.cdc.gov/Vaccinations/Vaccination-Coverage-and-Exemptions-among-Kinderga/ijqb-a7ye/about_data.

`data/measles-cases-county.json`

Combines three sources:

- Census CitySDK v2, https://github.com/uscensusbureau/citysdk. Provides GeoJSON data for counties.
- JHU Measles Data Repository, https://github.com/CSSEGISandData/measles_data. Provides U.S. measles cases by county for 2025.
- JHU MMR Data Repository, https://github.com/CSSEGISandData/MMR_data. Provides MMR vaccination coverage by county for recent years.

`data/states.json`

- Census CitySDK v2, state GeoJSON data.
