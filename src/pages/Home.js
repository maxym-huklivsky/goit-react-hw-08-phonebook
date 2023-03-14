import { Typography } from '@material-ui/core';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

const Home = () => {
  return (
    <Typography
      variant="h2"
      component="h1"
      style={{
        display: 'flex',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ContactPhoneIcon color="primary" fontSize="large" />
      Phonebook
    </Typography>
  );
};

export default Home;
