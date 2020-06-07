const fs = require('fs').promises;
const resolvePath = require('path').resolve;
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
  })
  .catch((err) => {
    throw err;
  });


module.exports = getCities;
