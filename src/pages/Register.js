import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { authRegister } from 'redux/auth/options';
import { selectError } from 'redux/auth/selectors';
import { emailSchema, nameSchema, passwordSchema } from '../validSchemas';

const Register = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = data => {
    const { name, email, password } = data;

    dispatch(authRegister({ name, email, password }));
  };

  return (
    <Grid>
      <Card style={{ maxWidth: 450, padding: '20px 5px', margin: '0 auto' }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Register
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                  placeholder="Enter first name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  {...register('name', nameSchema)}
                />
                {errors.name && (
                  <span style={{ color: 'red' }}>
                    {errors.name.message || 'Error'}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  placeholder="Enter email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  {...register('email', emailSchema)}
                />
                {errors.email && (
                  <span style={{ color: 'red' }}>
                    {errors.email.message || 'Error'}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  placeholder="Enter password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  {...register('password', passwordSchema)}
                />
                {errors.password && (
                  <span style={{ color: 'red' }}>
                    {errors.password.message || 'Error'}
                  </span>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>

              {error && (
                <Typography style={{ color: 'red' }}>
                  Name, email or password is incorrect
                </Typography>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Register;
