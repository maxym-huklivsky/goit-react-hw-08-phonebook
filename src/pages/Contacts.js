import { ContactsList } from 'components/ContactsList';
import { ContactForm } from 'components/ContactForm';
import { FilterContacts } from 'components/FilterContacts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/options';
import { selectError, selectIsLoading } from 'redux/contacts/selectors';

const Contacts = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <FilterContacts />
      <ContactsList />

      {isLoading && <b>Wait please...</b>}
      {error && (
        <b style={{ color: 'red' }}>
          Oops, something went wrong! Please reload the page
        </b>
      )}
    </div>
  );
};

export default Contacts;
