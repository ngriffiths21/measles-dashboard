import pandas as pd
import sys

vax_cov = pd.read_csv(
    "data/vaccine-coverage.csv",
    dtype={"Estimate (%)": float},
    na_values=["NReq", "NR", "Nreq"],
)

vax_cov["Unvaccinated"] = 100 - vax_cov["Estimate (%)"]

vax_cov["Year"] = [int(yr[:-3]) for yr in vax_cov["School Year"]]

vax_cov = vax_cov[vax_cov["Year"] >= 2014]

slicer = (vax_cov[["Geography", "Vaccine/Exemption"]] == ("United States", "MMR")).all(
    axis=1
)

vax_cov = vax_cov[slicer]

vax_cov.sort_values(by="Year").to_csv(sys.stdout)
