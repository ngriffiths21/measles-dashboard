import pandas as pd
import sys
import urllib.request
import json
import math

with urllib.request.urlopen(
    "https://raw.githubusercontent.com/uscensusbureau/citysdk/refs/heads/master/v2/GeoJSON/5m/2022/county.json"
) as f:
    county_json = json.load(f)

cases_county = pd.read_csv(
    "https://raw.githubusercontent.com/CSSEGISandData/measles_data/refs/heads/main/measles_county_all_updates.csv"
)

vax_data = pd.read_csv("https://raw.githubusercontent.com/CSSEGISandData/MMR_data/refs/heads/main/mmr_data_us_counties.csv")

vax_data = vax_data.set_index("FIPS")["SY2022_23"]

##### Process case data #####

# verify unique location type and outcome type
if len(cases_county["location_type"].unique()) != 1:
    raise Exception("In the measles county data, location type wasn't unique!")
elif len(cases_county["outcome_type"].unique()) != 1:
    raise Exception("In the measles county data, outcome_type wasn't unique!")

counts = cases_county[["location_id", "value"]].groupby("location_id").sum()["value"]

##### Combine datasets #####

for cty in county_json["features"]:
    id_num = int(
        cty["properties"]["STATEFP"]
        + cty["properties"]["COUNTYFP"]
    )
    these_cases = counts.get(id_num)
    cty["properties"]["cases"] = (
        int(these_cases) if these_cases is not None else 0
    )
    these_vax = vax_data.get(id_num)
    cty["properties"]["vaxrate"] = (
        float(these_vax) if (these_vax is not None) else float(0)
    )
    if math.isnan(cty["properties"]["vaxrate"]):
        cty["properties"]["vaxrate"] = float(0);

json.dump(county_json, sys.stdout)
