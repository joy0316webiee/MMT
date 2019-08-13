import * as Actions from '../../actions/fuse/index';

const initialState = {
  state: false,
  options: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    autoHideDuration: 6000,
    message: 'Hi',
    variant: null
  }
};

const message = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.SHOW_MESSAGE: {
      return {
        state: true,
        options: {
          ...initialState.options,
          ...action.options
        }
      };
    }
    case Actions.HIDE_MESSAGE: {
      return {
        ...state,
        state: false
      };
    }
    default: {
      return state;
    }
  }
};

export default message;
