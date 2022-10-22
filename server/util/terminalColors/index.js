const colors = require('colors');
// Require the 'colors' module for Custom Theme
const colorTheme = colors.setTheme({ info: 'green', error: 'red', warning: 'yellow' });

module.exports = { colors, colorTheme };
