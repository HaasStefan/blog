const fonts = require('./fonts.js');
const {parallel} = require('gulp');

exports.default = parallel(fonts);
