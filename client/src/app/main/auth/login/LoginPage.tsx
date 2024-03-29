import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  TextField,
  Typography
} from '@material-ui/core';
import * as fuse from '@fuse';
import { useForm } from '@fuse/hooks';

import * as Actions from 'app/store/actions';
import auth0Service from 'app/services/auth0Service';
import { SubmitEvent } from 'app/types';

const { FuseAnimate }: any = fuse;

const useStyles = makeStyles((theme: any) => ({
  root: {
    background:
      'radial-gradient(' +
      darken(theme.palette.primary.dark, 0.5) +
      ' 0%, ' +
      theme.palette.primary.dark +
      ' 80%)',
    color: theme.palette.primary.contrastText
  }
}));

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [hasAuth0, setHasAuth0] = useState(false);

  useEffect(() => {
    auth0Service.init((success: any) => {
      setHasAuth0(success);
    });
  }, []);

  const classes = useStyles();

  const { form, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    remember: true
  });

  const isFormValid = () => {
    return form.email.length > 0 && form.password.length > 0;
  };

  const handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault();

    if (hasAuth0) {
      auth0Service.login(form).catch(() => {
        dispatch(
          Actions.showMessage({
            message: 'E-mail or incorrect password. Please try again!',
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            },
            variant: 'warning'
          })
        );
      });
    } else {
      dispatch(
        Actions.showMessage({
          message: 'Auth0 server error. Please try again!',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          },
          variant: 'warning'
        })
      );
    }

    resetForm();
  };

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" />

              <Typography variant="h6" className="mt-16 mb-32">
                LOGIN TO YOUR ACCOUNT
              </Typography>

              <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit}
              >
                <TextField
                  className="mb-16"
                  label="Email"
                  autoFocus
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <TextField
                  className="mb-16"
                  label="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <div className="flex items-center justify-between">
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="remember"
                          checked={form.remember}
                          onChange={handleChange}
                        />
                      }
                      label="Remember Me"
                    />
                  </FormControl>

                  <Link className="font-medium" to="/pages/auth/forgot-password">
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="LOG IN"
                  disabled={!isFormValid()}
                  type="submit"
                >
                  LOGIN
                </Button>
              </form>

              <div className="my-24 flex items-center justify-center">
                <Divider className="w-32" />
                <span className="mx-8 font-bold">OR</span>
                <Divider className="w-32" />
              </div>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">Don't have an account?</span>
                <Link className="font-medium" to="/register">
                  Create an account
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default LoginPage;
