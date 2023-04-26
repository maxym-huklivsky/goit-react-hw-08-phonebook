export const emailSchema = {
  required: 'Email field is required',
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: 'Email is invalid',
  },
};
