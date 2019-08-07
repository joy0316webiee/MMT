const settingsConfig = {
  layout: {
    style: 'layout3', // layout-1 layout-2 layout-3
    config: {
      // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
      mode: 'fullwidth',
      scroll: 'content',
      navbar: {
        display: true
      },
      toolbar: {
        display: true,
        position: 'below'
      },
      footer: {
        display: true,
        style: 'fixed'
      },
      leftSidePanel: {
        display: true
      },
      rightSidePanel: {
        display: true
      }
    }
  },
  customScrollbars: true,
  theme: {
    main: 'tech',
    navbar: 'mainThemeDark',
    toolbar: 'mainThemeLight',
    footer: 'mainThemeDark'
  }
};

export default settingsConfig;
