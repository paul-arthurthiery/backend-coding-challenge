const fs = require('fs').promises;
const resolvePath = require('path').resolve;

/** @module citiesParser */


/**
 *
 * @description sorts a given list of cities by their name
 * @param {Object[]} cities - list of cities
 * @param {string} cities[].name
 * @returns {Object[]} list of cities sorted alphabetically
 */
const sortCities = (cities) => cities.sort((a, b) => (a.name > b.name ? 1 : -1));

/**
 * @description parses a file containing city data into a list of cities
 * @async
 * @param {string} path - path to file containing list of all cities
 * @return {Object[]} list of cities containing their name, latitude, longitude, and fullName
 */
const getCities = (path) => fs.readFile(resolvePath(__dirname, path), 'utf8')
  .then((data) => {
    const rows = data.split('\n');
    // remove first and last row
    rows.shift();
    rows.pop();
    const cities = rows.map((row) => {
      const columns = row.split('\t');
      return {
        name: columns[1],
        latitude: columns[4],
        longitude: columns[5],
        fullName: `${columns[1]}, ${columns[10]}, ${columns[8]}`,
      };
    });
    return sortCities(cities);
  })
  .catch((err) => {
    throw err;
  });


module.exports = getCities;
