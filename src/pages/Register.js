import { useDispatch, useSelector } from 'react-redux';
import { register } from 'redux/auth/options';
import { selectError } from 'redux/auth/selectors';

const Register = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget.elements;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    dispatch(register({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" name="name" />
        Name
      </label>
      <br />
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
      <button type="submit">Register</button>
      <br />
      {error && (
        <b style={{ color: 'red' }}>Name, email or password is incorrect</b>
      )}
    </form>
  );
};

export default Register;
