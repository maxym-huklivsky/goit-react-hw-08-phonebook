import styled from '@emotion/styled';

export const FormContacts = styled.form`
  display: inline-block;
  padding: 8px;
  min-width: 300px;

  border: 1px solid black;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 12px;
`;

export const Submit = styled.button`
  font-size: 12px;
  background-color: transparent;
  border: 1px solid grey;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  :hover,
  :focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
