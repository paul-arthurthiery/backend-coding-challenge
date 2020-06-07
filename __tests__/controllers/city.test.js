const cityController = require('../../src/controllers/city');

const sortedCities = [];
const testFragment = 'Londo';
const testLatitude = '43.70011';
const testLongitude = '-79.4163';
const testSortedCities = [
  {
    name: 'Lombard',
    latitude: '41.88003',
    longitude: '-88.00784',
    fullName: 'Lombard, IL, US',
  },
  {
    name: 'Lomita',
    latitude: '33.79224',
    longitude: '-118.31507',
    fullName: 'Lomita, CA, US',
  },
  {
    name: 'Lompoc',
    latitude: '34.63915',
    longitude: '-120.45794',
    fullName: 'Lompoc, CA, US',
  },
  {
    name: 'London',
    latitude: '39.88645',
    longitude: '-83.44825',
    fullName: 'London, OH, US',
  },
  {
    name: 'London',
    latitude: '37.12898',
    longitude: '-84.08326',
    fullName: 'London, KY, US',
  },
  {
    name: 'London',
    latitude: '42.98339',
    longitude: '-81.23304',
    fullName: 'London, 08, CA',
  },
  {
    name: 'Londonderry',
    latitude: '42.86509',
    longitude: '-71.37395',
    fullName: 'Londonderry, NH, US',
  },
  {
    name: 'Londontowne',
    latitude: '38.93345',
    longitude: '-76.54941',
    fullName: 'Londontowne, MD, US',
  },
  {
    name: 'Lone Grove',
    latitude: '34.17537',
    longitude: '-97.26279',
    fullName: 'Lone Grove, OK, US',
  },
  {
    name: 'Lone Tree',
    latitude: '39.55171',
    longitude: '-104.8863',
    fullName: 'Lone Tree, CO, US',
  },
  {
    name: 'Long Beach',
    latitude: '33.76696',
    longitude: '-118.18923',
    fullName: 'Long Beach, CA, US',
  },
  {
    name: 'Long Beach',
    latitude: '40.58844',
    longitude: '-73.65791',
    fullName: 'Long Beach, NY, US',
  },
];
const testScoredCities = [
  {
    name: 'I am a city',
    latitude: 0,
    longitude: 90,
    score: 1,
  },
  {
    name: 'I am also a city',
    latitude: 45,
    longitude: -90,
    score: 0,
  },
];

describe('city controller', () => {
  describe('getMatchingCityRange', () => {
    it('returns the start and end index of matching cities', () => {
      expect(cityController.getMatchingCityRange(testFragment, testSortedCities)).toEqual([3, 7]);
    });
  });
  describe('getScoredCities', () => {
    it('scores given cities based on the passed parameters', () => {
      const testMatchedCities = testSortedCities.slice(3, 8);
      expect(cityController.getScoredCities(testMatchedCities, testFragment)).toEqual([
        {
          latitude: '39.88645',
          longitude: '-83.44825',
          name: 'London, OH, US',
          score: '0.83',
        },
        {
          latitude: '37.12898',
          longitude: '-84.08326',
          name: 'London, KY, US',
          score: '0.83',
        },
        {
          latitude: '42.98339',
          longitude: '-81.23304',
          name: 'London, 08, CA',
          score: '0.83',
        },
        {
          latitude: '42.86509',
          longitude: '-71.37395',
          name: 'Londonderry, NH, US',
          score: '0.45',
        },
        {
          latitude: '38.93345',
          longitude: '-76.54941',
          name: 'Londontowne, MD, US',
          score: '0.45',
        },
      ]);
      expect(cityController.getScoredCities(testMatchedCities, testFragment, testLatitude, testLongitude)).toEqual([{
        name: 'London, 08, CA',
        latitude: '42.98339',
        longitude: '-81.23304',
        score: '0.91',
      },
      {
        name: 'London, OH, US',
        latitude: '39.88645',
        longitude: '-83.44825',
        score: '0.90',
      },
      {
        name: 'London, KY, US',
        latitude: '37.12898',
        longitude: '-84.08326',
        score: '0.89',
      },
      {
        name: 'Londonderry, NH, US',
        latitude: '42.86509',
        longitude: '-71.37395',
        score: '0.71',
      },
      {
        name: 'Londontowne, MD, US',
        latitude: '38.93345',
        longitude: '-76.54941',
        score: '0.71',
      }]);
    });
  });
  describe('getCitySuggestions', () => {
    beforeAll(() => {
      cityController.getMatchingCityRange = jest.fn(() => [0, 0]);
      cityController.getScoredCities = jest.fn(() => testScoredCities);
    });
    afterAll(() => {
      cityController.getMatchingCityRange.mockRestore();
      cityController.getScoredCities.mockRestore();
    });
    it('calls getMatchingCityRange and getScoredCities with the given params', () => {
      cityController.getCitySuggestions(sortedCities, testFragment, 0, 0);
      expect(cityController.getMatchingCityRange).toHaveBeenCalledTimes(1);
      expect(cityController.getScoredCities).toHaveBeenCalledTimes(1);
      expect(cityController.getMatchingCityRange).toHaveBeenCalledWith(testFragment, []);
      expect(cityController.getScoredCities).toHaveBeenCalledWith([], testFragment, 0, 0);
    });
  });
});
