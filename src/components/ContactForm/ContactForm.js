import { nanoid } from 'nanoid';
import {
  FormContacts,
  Label,
  InputWrapper,
  Submit,
  Error,
} from './ContactForm.styled';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/options';
import { selectContacts } from 'redux/selectors';

const schema = yup.object().shape({
  name: yup.string().trim().min(4).max(24).required(),
  number: yup.string().trim().min(6).max(13).required(),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handlerContact = (values, actions) => {
    const { name, number } = values;

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

    actions.resetForm();
  };

  const idForNameInput = nanoid();
  const idForNumberInput = nanoid();

  return (
    <Formik
      initialValues={{ name: '', number: '+' }}
      validationSchema={schema}
      onSubmit={handlerContact}
    >
      <FormContacts>
        <InputWrapper>
          <Label htmlFor={idForNameInput}>Name</Label>
          <Field id={idForNameInput} type="text" name="name" />
          <ErrorMessage name="name" component={Error} />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor={idForNumberInput}>Number</Label>
          <Field id={idForNumberInput} type="tel" name="number" />
          <ErrorMessage name="number" component={Error} />
        </InputWrapper>

        <Submit type="submit">Add contact</Submit>
      </FormContacts>
    </Formik>
  );
};
