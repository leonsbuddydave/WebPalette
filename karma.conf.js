module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'], // Chrome
    frameworks: ['jasmine'],
    files: [
      'app/scripts/**/*.js',
      'test/**/*.spec.js'
    ]
  });
};