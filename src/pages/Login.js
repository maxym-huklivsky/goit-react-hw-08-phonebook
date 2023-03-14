import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/auth/options';
import { selectError } from 'redux/auth/selectors';

const Login = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;

    dispatch(login({ email, password }));

    e.currentTarget.reset();
  };

  return (
    <Grid>
      <Card style={{ maxWidth: 450, padding: '20px 5px', margin: '0 auto' }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  placeholder="Enter email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  placeholder="Enter password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  name="password"
                />
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
                  Email or password is incorrect
                </Typography>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
