const autoprefixer = require('autoprefixer');
const postcssCustomMedia = require('postcss-custom-media');

module.exports = {
  plugins: [
    autoprefixer(),
    postcssCustomMedia(),
  ],
};
