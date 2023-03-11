import { ContactItem, ContactInfo, RemoveContBtn } from './Contact.styled';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/options';

export const Contact = ({ contact: { id, name, phone } }) => {
  const dispatch = useDispatch();

  return (
    <ContactItem>
      <ContactInfo>
        {name}: {phone}
      </ContactInfo>
      <RemoveContBtn onClick={() => dispatch(deleteContact(id))}>
        Delete
      </RemoveContBtn>
    </ContactItem>
  );
};

Contact.propTypes = {
  contact: PropTypes.exact({
    createdAt: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
