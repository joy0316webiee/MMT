// for Auth.tsx
export interface IAuthProps {
  logout: () => (dispatch: any, getState: any) => null | undefined;
  setUserData: (user: any) => (dispatch: any) => void;
  setUserDataAuth0: (tokenData: any) => (dispatch: any) => void;
  setUserDataFirebase: (
    user: any,
    authUser: any
  ) => (dispatch: any, getState: any) => any;
  showMessage: (options: any) => void;
  hideMessage: () => void;
}

export interface IAuthState {
  waitAuthCheck: boolean;
}
