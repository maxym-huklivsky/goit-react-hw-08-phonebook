import { ContactItem, ContactInfo, ContBtn } from './Contact.styled';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/options';
import { correctContact } from 'redux/contacts/contactsSlice';

export const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(correctContact({ name, number, id }));
  };

  return (
    <ContactItem>
      <ContactInfo>
        {name}: {number}
      </ContactInfo>
      <div style={{ display: 'flex', gap: '10px' }}>
        <ContBtn onClick={() => dispatch(deleteContact(id))}>Delete</ContBtn>
        <ContBtn onClick={handleUpdate}>Correct</ContBtn>
      </div>
    </ContactItem>
  );
};

Contact.propTypes = {
  contact: PropTypes.exact({
    name: PropTypes.string,
    number: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
