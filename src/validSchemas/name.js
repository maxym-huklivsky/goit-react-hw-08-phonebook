export const nameSchema = {
  required: 'Name field is required',
  maxLength: {
    value: 20,
    message: 'Max lenght is 20',
  },
  minLength: {
    value: 3,
    message: 'Min lenght is 3',
  },
};
