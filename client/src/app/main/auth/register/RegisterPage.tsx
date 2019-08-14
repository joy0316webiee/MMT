import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography
} from '@material-ui/core';
import * as fuse from '@fuse';
import { useForm } from '@fuse/hooks';
import clsx from 'clsx';

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

const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const [hasAuth0, setHasAuth0] = useState(false);

  useEffect(() => {
    auth0Service.init((success: any) => {
      setHasAuth0(success);
    });
  }, []);

  const classes = useStyles();

  const { form, handleChange, resetForm } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    acceptTermsConditions: false
  });

  const isFormValid = () => {
    let errMessage = '';
    if (
      form.username.length === 0 ||
      form.email.length === 0 ||
      form.password.length === 0
    ) {
      errMessage = 'Please fill out all gaps!';
    } else if (form.password !== form.passwordConfirm) {
      errMessage = "Password doesn't match.";
    } else if (!form.acceptTermsConditions) {
      errMessage = 'Please accept terms of use.';
    } else {
      return true;
    }

    dispatch(
      Actions.showMessage({
        message: errMessage,
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        variant: 'warning'
      })
    );
    return false;
  };

  const handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault();

    if (!isFormValid()) return;

    if (hasAuth0) {
      auth0Service
        .register(form)
        .then(() => {
          resetForm();
          dispatch(
            Actions.showMessage({
              message: 'Successfully registered!',
              autoHideDuration: 5000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              },
              variant: 'success'
            })
          );
        })
        .catch(responseErr => {
          console.log(responseErr);
          let errMessage = 'Register failed!';
          if (
            responseErr.hasOwnProperty('policy') &&
            typeof responseErr.policy === 'string'
          ) {
            errMessage = `${responseErr.policy}`;
          } else if (
            responseErr.hasOwnProperty('message') &&
            typeof responseErr.message === 'string'
          ) {
            errMessage = `${responseErr.message}`;
          } else if (
            responseErr.hasOwnProperty('description') &&
            typeof responseErr.description === 'string'
          ) {
            errMessage = `${responseErr.description}`;
          } else if (
            responseErr.hasOwnProperty('name') &&
            typeof responseErr.name === 'string'
          ) {
            errMessage = `${responseErr.name}`;
          }

          dispatch(
            Actions.showMessage({
              message: errMessage,
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
                CREATE AN ACCOUNT
              </Typography>

              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit}
              >
                <TextField
                  className="mb-16"
                  label="Name"
                  autoFocus
                  type="name"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <TextField
                  className="mb-16"
                  label="Email"
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

                <TextField
                  className="mb-16"
                  label="Password (Confirm)"
                  type="password"
                  name="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <FormControl className="items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptTermsConditions"
                        checked={form.acceptTermsConditions}
                        onChange={handleChange}
                      />
                    }
                    label="I read and accept terms and conditions"
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Register"
                  type="submit"
                >
                  CREATE AN ACCOUNT
                </Button>
              </form>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">Already have an account?</span>
                <Link className="font-medium" to="/login">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default RegisterPage;
