import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/contacts/selectors';
import { changeFilter } from 'redux/contacts/filterSlice';
import { TextField } from '@material-ui/core';

export const FilterContacts = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const changeInput = e => {
    dispatch(changeFilter(e.target.value));
  };

  const idForFilterInput = nanoid();

  return (
    <TextField
      size="small"
      label="Filter contacts"
      variant="outlined"
      id={idForFilterInput}
      type="text"
      value={filter}
      onChange={changeInput}
    />
  );
};
