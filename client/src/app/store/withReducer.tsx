import * as React from 'react';
import { injectReducer } from 'app/store';

const withReducer = (key: any, reducer: any) => (WrappedComponent: React.ComponentType) =>
  class extends React.PureComponent {
    constructor(props: any) {
      super(props);
      injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withReducer;
