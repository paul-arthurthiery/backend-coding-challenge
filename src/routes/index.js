const express = require('express');
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
  if (latitude && (latitude > 90 || latitude < -90)) {
    return res.status(400).send('Input a latitude between 90 and -90');
  }
  if (longitude && (longitude > 180 || longitude < -180)) {
    return res.status(400).send('Input a longitude between 180 and -180');
  }
  if (!cities) {
    return res.status(503).send();
  }
  return res.send({
    suggestions: getCitySuggestions(cities, fragment, latitude, longitude),
  });
});

module.exports = router;
