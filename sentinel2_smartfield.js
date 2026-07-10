// Sentinel-2 crop monitoring over SmartField supersite A, AU Viborg (The field where my MSc thesis N2O data was collected: 56.449769 N, 9.543833 E)
// Crop sown in 2024: spring barley (Hordeum vulgare L.) with undersown grass-clover.
// The aim is to track spring barley greenness and canopy nitrogen signal across the 2024 growing season, and observe the crop response around the mineral fertiliser application (2 June 2024, 105 kg N/ha).

// The field boundary (drawn on the map)
var field = geometry;

//The spring barley growing season
var start = '2024-03-01';
var end   = '2024-08-31';

// The sentinel-2 surface reflectance, filtered to field, dates, low cloud
var images = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(field)
  .filterDate(start, end)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40));

// Two indices to every image added
//   NDVI = general greenness / biomass (near-infrared vs red)
//   NDRE = canopy chlorophyll / nitrogen signal (near-infrared vs red-edge)
function addIndices(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  var ndre = image.normalizedDifference(['B8', 'B5']).rename('NDRE'); // B5 = red-edge
  return image.addBands(ndvi).addBands(ndre);
}
var withIndices = images.map(addIndices);

// Season median composite for the map displays 
var composite = images.median();

// True-colour view of the field
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Sentinel-2 RGB');

//NDVI map (greenness)
var ndviMap = composite.normalizedDifference(['B8', 'B4']);
Map.addLayer(ndviMap, {min: 0, max: 1, palette: ['brown', 'yellow', 'green']}, 'NDVI');

//NDRE map (nitrogen / chlorophyll signal)
var ndreMap = composite.normalizedDifference(['B8', 'B5']);
Map.addLayer(ndreMap, {min: 0, max: 1, palette: ['purple', 'blue', 'cyan', 'green']}, 'NDRE');

// Showing the field boundary 
Map.centerObject(field, 14);
Map.addLayer(field, {color: 'red'}, 'SmartField supersite A');

// Plot both indices over the season 
var chart = ui.Chart.image.series({
  imageCollection: withIndices.select(['NDVI', 'NDRE']),
  region: field,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
  title: 'Spring barley greenness (NDVI) and nitrogen signal (NDRE), SmartField supersite A, 2024',
  hAxis: {title: 'Date'},
  vAxis: {title: 'Index value'},
  lineWidth: 2,
  pointSize: 3
});
print(chart);
