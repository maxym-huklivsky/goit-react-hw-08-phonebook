export const passwordSchema = {
  required: 'Password field is required',
  maxLength: {
    value: 16,
    message: 'Max lenght is 16',
  },
  minLength: {
    value: 8,
    message: 'Min lenght is 8',
  },
};
