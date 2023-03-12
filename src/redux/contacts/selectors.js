export const selectContacts = state => state.contacts.items;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectCorrectOn = state => state.contacts.correctOn;

export const selectFilter = state => state.filter.status;
