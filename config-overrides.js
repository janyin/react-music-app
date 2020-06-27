const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addWebpackAlias({
    '@': resolve('src'),
  }),
);
