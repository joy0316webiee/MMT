// For Login
export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginWithFireBaseParams {
  username: string;
  password: string;
}

// For Register
export interface IRegisterParams {
  email: string;
  password: string;
  displayName: string;
}

export interface IRegisterWithAuth0Params {
  email: string;
  password: string;
  username: string;
}

export interface IRegisterWithFirebaseParams {
  email: string;
  password: string;
  displayName: string;
}
