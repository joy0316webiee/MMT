import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useForm } from '@fuse/hooks';
import clsx from 'clsx';

import auth0Service from 'app/services/auth0Service';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
    color: theme.palette.primary.contrastText
  }
}));

const RegisterPage = () => {
  useEffect(() => auth0Service.init(), []);

  const classes = useStyles();

  const { form, handleChange, resetForm } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    acceptTermsConditions: false
  });

  const isFormValid = () => {
    return (
      form.username.length > 0 &&
      form.email.length > 0 &&
      form.password.length > 7 &&
      form.password === form.passwordConfirm &&
      form.acceptTermsConditions
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    auth0Service.register(form);
    resetForm();
  };

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" />

              <Typography variant="h6" className="mt-16 mb-32">
                CREATE AN ACCOUNT
              </Typography>

              <form name="registerForm" noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
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
                    control={<Checkbox name="acceptTermsConditions" checked={form.acceptTermsConditions} onChange={handleChange} />}
                    label="I read and accept terms and conditions"
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Register"
                  disabled={!isFormValid()}
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
