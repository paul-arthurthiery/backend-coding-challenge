const cityController = require('./city'); // circular import to allow mocking

/** @module cityController */

/**
 * @description returns the indexes of the first and last matching cities
 * @param {string} fragment
 * @param {Object[]} cities
 * @param {string} cities[].name
 * @param {string} cities[].latitude
 * @param {string} cities[].longitude
 * @param {string} cities[].fullName
 * @returns {number[]} indexes of the first and last matching cities
 */
const getMatchingCityRange = (fragment, cities) => {
  let startIndex = 0;
  let endIndex = cities.length - 1;
  while (startIndex < endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    const cityNameSizedToFragment = cities[middleIndex].name.slice(0, fragment.length);
    if (cityNameSizedToFragment < fragment) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex;
    }
  }
  const finalStartIndex = startIndex; // the first binary search found the index of the first matching element
  endIndex = cities.length - 1;
  while (startIndex < endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    const cityNameSizedToFragment = cities[middleIndex].name.slice(0, fragment.length);
    if (cityNameSizedToFragment <= fragment) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex;
    }
  }
  return [finalStartIndex, endIndex - 1]; // the second binary search found the index after the last matching element
};

/**
 * @description computes a confidence score for each city, and returns a list of scored cities
 * @param {Object[]} cities
 * @param {string} cities[].name
 * @param {string} cities[].latitude
 * @param {string} cities[].longitude
 * @param {string} cities[].fullName
 * @param {string} fragment
 * @param {string} [latitude]
 * @param {string} [longitude]
 * @returns {Object[]} list of cities with corresponding scores based on fragment, latitude and longitude
 */
const getScoredCities = (cities, fragment, latitude, longitude) => cities.map((city) => {
  let score;
  const nameScore = (fragment.length / city.name.length); // compute the distance between the given name and the matched name
  if (latitude && longitude) {
    const cityLat = parseInt(city.latitude, 10);
    const cityLong = parseInt(city.longitude, 10);
    const coordinateScore = (2 - (Math.abs(latitude - cityLat) / 180) - (Math.abs(longitude - cityLong) / 360)) / 2; // compute the distance between the given values and the actual coordinates
    score = (nameScore / 2 + coordinateScore / 2).toFixed(2); // set the relative weights equal since we can't know which is more important
  } else {
    score = (nameScore).toFixed(2);
  }
  return {
    name: city.fullName,
    latitude: city.latitude,
    longitude: city.longitude,
    score,
  };
}).sort((a, b) => b.score - a.score);

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
exports.getMatchingCityRange = getMatchingCityRange;
exports.getScoredCities = getScoredCities;
exports.getCitySuggestions = getCitySuggestions;
