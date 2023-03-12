import { nanoid } from 'nanoid';
import {
  FormContacts,
  Label,
  InputWrapper,
  Submit,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from 'redux/contacts/options';
import { selectContacts, selectCorrectOn } from 'redux/contacts/selectors';
import { useEffect, useState } from 'react';

export const ContactForm = () => {
  const correctOn = useSelector(selectCorrectOn);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('+');

  useEffect(() => {
    if (correctOn.on) {
      setName(correctOn.name);
      setNumber(correctOn.number);
    }
  }, [correctOn]);

  const handlerChangeName = e => {
    setName(e.target.value);
  };

  const handlerChangeNumber = e => {
    setNumber(e.target.value);
  };

  const handlerContact = e => {
    e.preventDefault();

    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;

    if (correctOn.on) {
      dispatch(
        updateContact({
          name,
          number,
          id: correctOn.id,
        })
      );

      setName('');
      setNumber('+');

      return;
    }

    // Check name for repetition
    const normalizeName = name.toLowerCase();
    const NameAlreadyInContacts = contacts.find(
      ({ name: nameOfContact }) => nameOfContact.toLowerCase() === normalizeName
    );
    if (NameAlreadyInContacts) {
      return alert(`${name} is already in contacts.`);
    }

    // Check number for repetition
    let thisNameOfContact = null;
    const NumberAlreadyInContacts = contacts.find(
      ({ number: numberOfContact, name: nameOfContact }) => {
        thisNameOfContact = numberOfContact === number && nameOfContact;
        return numberOfContact === number;
      }
    );
    if (NumberAlreadyInContacts) {
      return alert(`${number}(${thisNameOfContact}) is already in contacts.`);
    }

    dispatch(addContact({ name, number }));

    setName('');
    setNumber('+');
  };

  const idForNameInput = nanoid();
  const idForNumberInput = nanoid();

  return (
    <FormContacts onSubmit={handlerContact}>
      <InputWrapper>
        <Label htmlFor={idForNameInput}>Name</Label>
        <input
          id={idForNameInput}
          type="text"
          name="name"
          value={name}
          onChange={handlerChangeName}
        />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor={idForNumberInput}>Number</Label>
        <input
          id={idForNumberInput}
          type="tel"
          name="number"
          value={number}
          onChange={handlerChangeNumber}
        />
      </InputWrapper>

      <Submit type="submit">{correctOn.on ? 'Update' : 'Add contact'}</Submit>
    </FormContacts>
  );
};
