const getCities = require('../../src/data/cities-parser');

const testCorrectPath = '../../__tests__/data/cities_canada-usa.test.tsv';
const testIncorrectPath = 'eeeeee';
const testParsedCities = [
  {
    fullName: 'Fairmont, WV, US',
    latitude: '39.48508',
    longitude: '-80.14258',
    name: 'Fairmont',
  },
  {
    fullName: 'Grafton, WV, US',
    latitude: '39.34092',
    longitude: '-80.01897',
    name: 'Grafton',
  },
  {
    fullName: 'Huntington, WV, US',
    latitude: '38.41925',
    longitude: '-82.44515',
    name: 'Huntington',
  },
  {
    fullName: 'Hurricane, WV, US',
    latitude: '38.43259',
    longitude: '-82.02014',
    name: 'Hurricane',
  },
  {
    fullName: 'Keyser, WV, US',
    latitude: '39.44093',
    longitude: '-78.97392',
    name: 'Keyser',
  },
  {
    fullName: 'Sulphur Springs, TX, US',
    latitude: '33.13845',
    longitude: '-95.60107',
    name: 'Sulphur Springs',
  },
  {
    fullName: 'Sunnyvale, TX, US',
    latitude: '32.79652',
    longitude: '-96.56082',
    name: 'Sunnyvale',
  },
  {
    fullName: 'Taylor, TX, US',
    latitude: '30.57076',
    longitude: '-97.40944',
    name: 'Taylor',
  },
  {
    fullName: 'Temple, TX, US',
    latitude: '31.09823',
    longitude: '-97.34278',
    name: 'Temple',
  },
  {
    fullName: 'Terrell, TX, US',
    latitude: '32.73596',
    longitude: '-96.27526',
    name: 'Terrell',
  },
  {
    fullName: 'Texarkana, TX, US',
    latitude: '33.42512',
    longitude: '-94.04769',
    name: 'Texarkana',
  },
  {
    fullName: 'Texas City, TX, US',
    latitude: '29.38384',
    longitude: '-94.9027',
    name: 'Texas City',
  },
  {
    fullName: 'The Colony, TX, US',
    latitude: '33.08901',
    longitude: '-96.88639',
    name: 'The Colony',
  },
  {
    fullName: 'The Woodlands, TX, US',
    latitude: '30.15799',
    longitude: '-95.48938',
    name: 'The Woodlands',
  },
  {
    fullName: 'Timberwood Park, TX, US',
    latitude: '29.70578',
    longitude: '-98.47835',
    name: 'Timberwood Park',
  },
  {
    fullName: 'Tomball, TX, US',
    latitude: '30.09716',
    longitude: '-95.61605',
    name: 'Tomball',
  },
  {
    fullName: 'Trophy Club, TX, US',
    latitude: '32.9979',
    longitude: '-97.18362',
    name: 'Trophy Club',
  },
  {
    fullName: 'Tyler, TX, US',
    latitude: '32.35126',
    longitude: '-95.30106',
    name: 'Tyler',
  },
  {
    fullName: 'Universal City, TX, US',
    latitude: '29.54801',
    longitude: '-98.29112',
    name: 'Universal City',
  },
  {
    fullName: 'University Park, TX, US',
    latitude: '32.85013',
    longitude: '-96.80028',
    name: 'University Park',
  },
  {
    fullName: 'Uvalde, TX, US',
    latitude: '29.20968',
    longitude: '-99.78617',
    name: 'Uvalde',
  },
];

describe('cities-parser', () => {
  describe('getCities', () => {
    it('returns a list of objects from the given path', async () => {
      expect(await getCities(testCorrectPath)).toEqual(testParsedCities);
    });
    it('throws if the given path is invalid', async () => {
      await expect(getCities(testIncorrectPath)).rejects.toBeTruthy();
    });
  });
});
