import { Contact } from 'components/Contact';
import { useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';

export const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const nolmalizeFilter = filter.toLowerCase();
  const visiableContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(nolmalizeFilter)
  );

  return (
    <ul>
      {visiableContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};
