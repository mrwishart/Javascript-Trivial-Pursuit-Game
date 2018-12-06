const config = {
  entry: `${ __dirname }/src/app.js`,
  output: {
    filename: 'bundle.js',
    path: `${ __dirname }/public/js`
  },
  mode: 'development'
};

module.exports = config;
