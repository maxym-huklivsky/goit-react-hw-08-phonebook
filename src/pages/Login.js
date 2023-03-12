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
    <form onSubmit={handleSubmit}>
      <label>
        <input type="email" name="email" />
        Email
      </label>
      <br />
      <label>
        <input type="password" name="password" />
        Password
      </label>
      <br />
      <button type="submit">Login</button>
      <br />
      {error && <b style={{ color: 'red' }}>Email or password is incorrect</b>}
    </form>
  );
};

export default Login;
