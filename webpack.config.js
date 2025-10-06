const { withModuleFederation } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf_layout',

  exposes: {
    './Header': './src/app/components/header/header.component.ts',
    './Footer': './src/app/components/footer/footer.component.ts',
    './Menu': './src/app/components/menu-lateral/menu-lateral.component.ts',
  },

  shared: {
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },

  output: {
    publicPath: "auto",
    uniqueName: "mf_layout",
    clean: true
  },
});