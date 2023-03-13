import { NavLink, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserName,
  selectIsLoggedIn,
  selectError,
} from 'redux/auth/selectors';
import { logout } from 'redux/auth/options';
import { Suspense } from 'react';

const StyledLink = styled(NavLink)`
  &.active {
    background-color: orange;
  }
`;

export const Layout = () => {
  const error = useSelector(selectError);
  const name = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        style={{
          backgroundColor: 'lightcoral',
          height: '60px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <StyledLink to="/">Home</StyledLink>
          {!isLoggedIn && (
            <>
              <StyledLink to="/register">Register</StyledLink>
              <StyledLink to="/login">Login</StyledLink>
            </>
          )}
          {isLoggedIn && <StyledLink to="/contacts">Contacts</StyledLink>}
        </nav>

        {isLoggedIn && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <p>Hello, {name}</p>
            {error ? (
              <b style={{ color: 'red' }}>
                Oops, something went wrong! Please reload the page
              </b>
            ) : (
              <button type="button" onClick={handleLogOut}>
                LogOut
              </button>
            )}
          </div>
        )}
      </div>

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
