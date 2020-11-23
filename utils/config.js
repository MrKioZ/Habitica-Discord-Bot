const fs = require('fs');
const path = require('path')

let rawdata = fs.readFileSync(path.join(__dirname, '../config.json'));
let config = JSON.parse(rawdata);

exports.config = config