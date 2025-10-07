const { withModuleFederation } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-header-footer',
  filename: "remoteEntryMF_HeaderFooter.js",
  exposes: {
    './Header': './src/app/components/header/header.component.ts',
    './Footer': './src/app/components/footer/footer.component.ts',
    './MenuLateral': './src/app/components/menu-lateral/menu-lateral.component.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: "auto",
    }),
  },
});