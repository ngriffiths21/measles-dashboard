import pandas as pd
import sys
import urllib.request
import json

with urllib.request.urlopen(
    "https://raw.githubusercontent.com/uscensusbureau/citysdk/refs/heads/master/v2/GeoJSON/5m/2022/county.json"
) as f:
    county_json = json.load(f)

cases_county = pd.read_csv(
    "https://raw.githubusercontent.com/CSSEGISandData/measles_data/refs/heads/main/measles_county_all_updates.csv"
)

# verify unique location type and outcome type
if len(cases_county["location_type"].unique()) != 1:
    raise Exception("In the measles county data, location type wasn't unique!")
elif len(cases_county["outcome_type"].unique()) != 1:
    raise Exception("In the measles county data, outcome_type wasn't unique!")

counts = cases_county[["location_id", "value"]].groupby("location_id").sum()["value"]

for i, _ in enumerate(county_json["features"]):
    id_num = int(
        county_json["features"][i]["properties"]["STATEFP"]
        + county_json["features"][i]["properties"]["COUNTYFP"]
    )
    these_cases = counts.get(id_num)
    county_json["features"][i]["properties"]["cases"] = (
        int(these_cases) if these_cases is not None else 0
    )

json.dump(county_json, sys.stdout)
