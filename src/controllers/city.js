/**
 * @description calls getMatchingCityRange and getScoredCities to return a list of suggestions from the fragment, latitude and longitude
 * @param {Object[]} sortedCities
 * @param {string} sortedCities[].name
 * @param {string} sortedCities[].latitude
 * @param {string} sortedCities[].longitude
 * @param {string} sortedCities[].fullName
 * @param {string} fragment
 * @param {string} [latitude]
 * @param {string} [longitude]
 * @returns {Object[]} list of scored suggestions matching the given fragment
 */
const getCitySuggestions = (sortedCities, fragment, latitude, longitude) => {
  const [startIndex, endIndex] = cityController.getMatchingCityRange(fragment, sortedCities);
  return cityController.getScoredCities(
    sortedCities.slice(startIndex, endIndex + 1),
    fragment,
    latitude,
    longitude,
  );
};
exports.getCitySuggestions = getCitySuggestions;
