import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/options';
import { correctContact } from 'redux/contacts/contactsSlice';
import { Box, Button, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BuildIcon from '@mui/icons-material/Build';

export const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(correctContact({ name, number, id }));
  };

  return (
    <Box
      style={{
        '&:not(:lastOfType)': {
          marginBottom: 8,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box style={{ marginRight: 12, display: 'flex', gap: 4 }}>
        <AccountBoxIcon color="primary" />
        <Typography>
          {name}: {number}
        </Typography>
      </Box>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          size="small"
          endIcon={<DeleteForeverIcon color="primary" />}
          onClick={() => dispatch(deleteContact(id))}
        >
          Delete
        </Button>
        <Button
          size="small"
          endIcon={<BuildIcon color="primary" />}
          onClick={handleUpdate}
        >
          Correct
        </Button>
      </div>
    </Box>
  );
};

Contact.propTypes = {
  contact: PropTypes.exact({
    name: PropTypes.string,
    number: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
