# Sentinel-2 Crop Monitoring at AU Viborg (SmartField Supersite A)

Monitoring spring barley dynamics across the 2024 growing season using Sentinel-2
satellite time series, over the experimental field where I collected my MSc thesis
nitrous oxide (N2O) data at Aarhus University, AU Viborg (Foulum), Jutland, Denmark.

![Spring barley NDVI and NDRE time series](barley_ndvi_ndre.png)

## Motivation

My MSc thesis examined the spatial variability of N2O emissions at this field
using ground measurements and geostatistics. This project extends that work
upward, from point measurements on the ground to satellite observation of the same
field and the same growing season, as a first step toward monitoring crop and
nitrogen dynamics remotely.

## Site

SmartField Supersite A, AU Viborg (Foulum), Denmark (56.449769 N, 9.543833 E).
Sandy soil, temperate climate (roughly 627 to 678 mm mean annual precipitation,
mean annual temperature 8.2 C). In 2024 the field was sown with spring barley
(Hordeum vulgare L.) with an undersown grass-clover mixture (red clover, white
clover, and ryegrass). Mineral fertiliser was applied on 2 June 2024 at 105 kg N,
15 kg P, and 50 kg K per hectare, uniformly across the experimental area.

## Method

- Platform: Google Earth Engine (JavaScript API).
- Data: Sentinel-2 Level-2A surface reflectance (COPERNICUS/S2_SR_HARMONIZED).
- Season: March to August 2024 (spring barley cycle).
- Cloud handling: scenes filtered to below 40% cloud cover.
- Field defined as a hand-drawn boundary polygon around the experimental plots.
- Indices computed per image:
  - NDVI (B8, B4): canopy greenness and biomass.
  - NDRE (B8, B5): red-edge index, a proxy for canopy chlorophyll and nitrogen.
- Outputs: NDVI and NDRE map layers over the field, and a mean index time series
  across the season.

## What the results show

Both indices trace the spring barley cycle: low in early spring, a steep rise
from early June, a peak in early July, and a decline toward harvest. The June
increase coincides with active crop growth and the 2 June nitrogen application,
with the red-edge index (NDRE) tracking the canopy nitrogen response. The
late-season recovery after harvest reflects the undersown grass-clover mixture
greening up once the barley is removed.

## Limitations

No ground-truth nitrogen or yield data is joined at this stage, so the nitrogen
interpretation is based on the red-edge signal rather than validated
measurements. A single fertiliser event may produce only a modest change in the
satellite signal, since the crop also draws on soil nitrogen. Some observations
may carry residual noise from imperfect cloud masking.

## Next steps

- Relate the satellite indices to measured field data where available.
- Separate the barley and undersown grass-clover signals more explicitly.
- Explore a simple model linking the index time series to a crop variable.

## Files

- `sentinel2_smartfield.js` - the Google Earth Engine script.
- `Spring_barley_ndvi_ndre_chart.png` - NDVI and NDRE time series over the season.
- `Supersite_field.jpg` - satellite view of the experimental field boundary.
- `Sentinel2.jpg` - Sentinel-2 RGB composite of the field.
- `NDVI.jpg`- NDVI map.
- `NDRE.jpg` - NSRE map.
