const express = require('express');
const createError = require('http-errors');
const getCities = require('../data/cities-parser');
const { getCitySuggestions } = require('../controllers/city');

let cities;
(async () => {
  cities = await getCities('cities_canada-usa.tsv');
})();

const router = express.Router();

/* GET suggestions. */
router.get('/', (req, res) => {
  const { q: fragment, latitude, longitude } = req.query;
  if (!fragment || !fragment.length) {
    return res.send({ suggestions: [] });
  }
  return res.send(cities
    ? {
      suggestions: getCitySuggestions(cities, fragment, latitude, longitude),
    }
    : createError(503));
});

module.exports = router;
