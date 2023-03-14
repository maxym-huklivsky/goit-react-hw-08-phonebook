import { ContactsList } from 'components/ContactsList';
import { ContactForm } from 'components/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/options';
import { selectError, selectIsLoading } from 'redux/contacts/selectors';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const Contacts = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Grid>
      <Card style={{ maxWidth: 450, padding: '20px 5px', margin: '0 auto' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <ContactPhoneIcon color="primary" />
            Phonebook
          </Typography>
          <ContactForm />

          <ContactsList />

          {isLoading && <Typography>Wait please...</Typography>}
          {error && (
            <Typography style={{ color: 'red' }}>
              Oops, something went wrong! Please reload the page
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Contacts;
