import { Link, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, selectIsLoggedIn } from 'redux/auth/selectors';
import { logout } from 'redux/auth/options';
import { Suspense } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';

const StyledLink = styled(Link)`
  color: #fff;
`;

export const Layout = () => {
  const name = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <AppBar position="static" style={{ marginBottom: 40 }}>
        <Toolbar>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexGrow: 1,
              alignItems: 'center',
            }}
          >
            <Box>
              <StyledLink to="/">
                <Button color="inherit">Home</Button>
              </StyledLink>
              {isLoggedIn && (
                <StyledLink to="/contacts">
                  <Button color="inherit">Contacts</Button>
                </StyledLink>
              )}
            </Box>
            {isLoggedIn ? (
              <Toolbar style={{ gap: 12 }}>
                <Typography variant="subtitle1" component="p">
                  Hello, {name}
                </Typography>

                <Button
                  variant="contained"
                  style={{
                    padding: 2,
                    backgroundColor: '#fff',
                    color: '#115293',
                  }}
                  onClick={handleLogOut}
                >
                  LogOut
                </Button>
              </Toolbar>
            ) : (
              <Box>
                <StyledLink to="/register">
                  <Button color="inherit">Register</Button>
                </StyledLink>
                <StyledLink to="/login">
                  <Button color="inherit">Login</Button>
                </StyledLink>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
