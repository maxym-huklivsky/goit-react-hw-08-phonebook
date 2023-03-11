import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { changeFilter } from 'redux/filterSlice';
import { FilterContainer, Label } from './FilterContacts.styled';

export const FilterContacts = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const changeInput = e => {
    dispatch(changeFilter(e.target.value));
  };

  const idForFilterInput = nanoid();

  return (
    <FilterContainer>
      <Label htmlFor={idForFilterInput}>Find contacts by name</Label>
      <input
        id={idForFilterInput}
        type="text"
        value={filter}
        onChange={changeInput}
      />
    </FilterContainer>
  );
};
