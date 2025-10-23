import urllib.request

with urllib.request.urlopen(
    "https://raw.githubusercontent.com/uscensusbureau/citysdk/refs/heads/master/v2/GeoJSON/5m/2022/us.json"
) as f:
    contents = f.read()

print(contents.decode("utf-8"), end="")
