import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from 'redux/contacts/options';
import { selectContacts, selectCorrectOn } from 'redux/contacts/selectors';
import { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { FilterContacts } from 'components/FilterContacts';

export const ContactForm = () => {
  const correctOn = useSelector(selectCorrectOn);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handlerContact = e => {
    e.preventDefault();

    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;

    // Check name for repetition
    const normalizeName = name.toLowerCase();
    const NameAlreadyInContacts = contacts.find(
      ({ name: nameOfContact }) => nameOfContact.toLowerCase() === normalizeName
    );
    if (NameAlreadyInContacts) {
      return alert(`${name} is already in contacts.`);
    }
    //

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
    //

    if (correctOn.on) {
      dispatch(
        updateContact({
          name,
          number,
          id: correctOn.id,
        })
      );
    } else {
      dispatch(addContact({ name, number }));
    }

    resetForm();
  };

  return (
    <form onSubmit={handlerContact} style={{ marginBottom: 36 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            value={name}
            onChange={handlerChangeName}
            placeholder="Enter name"
            label="Name"
            variant="outlined"
            fullWidth
            required
            name="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Enter number"
            label="Number"
            variant="outlined"
            fullWidth
            required
            type="tel"
            name="number"
            value={number}
            onChange={handlerChangeNumber}
          />
        </Grid>

        <div
          style={{
            display: 'flex',
            gap: 28,
            paddingLeft: 5,
            paddingRight: 5,
            marginTop: 16,
          }}
        >
          <Button
            style={{ alignSelf: 'flex-start' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            {correctOn.on ? 'Update' : 'Add contact'}
          </Button>

          <FilterContacts />
        </div>
      </Grid>
    </form>
  );
};
