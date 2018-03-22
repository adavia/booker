const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { 
      '@font-family-no-number': 'Open Sans, sans-serif',
      '@line-height-base': '1',
      '@layout-body-background': '#FFF',
      '@layout-header-background': '#FFF',
      '@layout-header-height': '50px',
      '@layout-header-padding': '0',
      '@border-radius-base': '3px',
      '@form-item-margin-bottom': '15px',
      '@input-height-base': '35px',
      '@input-placeholder-color': 'rgba(0, 0, 0, 0.3)',
      '@btn-height-base': '35px',

      '@primary-color': '#79B265',
      '@error-color': '#EF4F43',
      '@highlight-color': '#EF4F43'
    }
  })(config, env);
  return config;
};