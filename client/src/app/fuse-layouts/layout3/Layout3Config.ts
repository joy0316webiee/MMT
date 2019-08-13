const config = {
  title: 'Layout 3 - Horizontal',
  defaults: {
    mode: 'container',
    scroll: 'content',
    navbar: {
      display: true
    },
    toolbar: {
      display: true,
      position: 'above'
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
  },
  form: {
    mode: {
      title: 'Mode',
      type: 'radio',
      options: [
        {
          name: 'Boxed',
          value: 'boxed'
        },
        {
          name: 'Full Width',
          value: 'fullwidth'
        },
        {
          name: 'Container',
          value: 'container'
        }
      ]
    },
    navbar: {
      type: 'group',
      title: 'Navbar',
      children: {
        display: {
          title: 'Display',
          type: 'switch'
        }
      }
    },
    toolbar: {
      type: 'group',
      title: 'Toolbar',
      children: {
        display: {
          title: 'Display',
          type: 'switch'
        },
        position: {
          title: 'Position',
          type: 'radio',
          options: [
            {
              name: 'Above',
              value: 'above'
            },
            {
              name: 'Below',
              value: 'below'
            }
          ]
        }
      }
    },
    footer: {
      type: 'group',
      title: 'Footer',
      children: {
        display: {
          title: 'Display',
          type: 'switch'
        },
        style: {
          title: 'Style',
          type: 'radio',
          options: [
            {
              name: 'Fixed',
              value: 'fixed'
            },
            {
              name: 'Static',
              value: 'static'
            }
          ]
        }
      }
    }
  }
};

export default config;
