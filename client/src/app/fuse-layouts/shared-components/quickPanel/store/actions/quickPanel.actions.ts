import axios from 'axios';

export const TOGGLE_QUICK_PANEL = '[QUICK PANEL] TOGGLE QUICK PANEL';
export const GET_QUICK_PANEL_DATA = '[QUICK PANEL] GET DATA';

export const getQuickPanelData = () => {
  const request = axios.get('/api/quick-panel/data');
  return (dispatch: any) =>
    request.then(response =>
      dispatch({
        type: GET_QUICK_PANEL_DATA,
        payload: response.data
      })
    );
};

export const toggleQuickPanel = () => ({
  type: TOGGLE_QUICK_PANEL
});
