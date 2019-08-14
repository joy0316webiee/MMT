import * as fuse from '@fuse';

const { FuseUtils }: any = fuse;

export const GET_NAVIGATION = '[NAVIGATION] GET NAVIGATION';
export const SET_NAVIGATION = '[NAVIGATION] SET NAVIGATION';
export const RESET_NAVIGATION = '[NAVIGATION] RESET NAVIGATION';

export const getNavigation = () => ({
  type: GET_NAVIGATION
});

export const setNavigation = (navigation: any) => ({
  type: SET_NAVIGATION,
  navigation
});

export const resetNavigation = () => ({
  type: RESET_NAVIGATION
});

export const appendNavigationItem = (item: any, parentId: any) => {
  return (dispatch: any, getState: any) => {
    const { navigation } = getState().fuse;
    return dispatch({
      type: SET_NAVIGATION,
      navigation: FuseUtils.appendNavItem(navigation, item, parentId)
    });
  };
};

export const prependNavigationItem = (item: any, parentId: any) => {
  return (dispatch: any, getState: any) => {
    const { navigation } = getState().fuse;
    return dispatch({
      type: SET_NAVIGATION,
      navigation: FuseUtils.prependNavItem(navigation, item, parentId)
    });
  };
};

export const updateNavigationItem = (id: any, item: any) => {
  return (dispatch: any, getState: any) => {
    const { navigation } = getState().fuse;
    return dispatch({
      type: SET_NAVIGATION,
      navigation: FuseUtils.updateNavItem(navigation, id, item)
    });
  };
};

export const removeNavigationItem = (id: any) => {
  return (dispatch: any, getState: any) => {
    const { navigation } = getState().fuse;
    return dispatch({
      type: SET_NAVIGATION,
      navigation: FuseUtils.removeNavItem(navigation, id)
    });
  };
};
