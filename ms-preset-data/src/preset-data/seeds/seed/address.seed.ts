export const Adress = {
  name: 'Adresse',
  info: 'Adresse',
  type: 1,
  fields: [
    {
      type: 0,
      label: 'Nom de rue et numéro',
      mandatory: true,
    },
    {
      type: 0,
      label: 'Nom de ville',
      mandatory: true,
    },
    {
      type: 1,
      label: 'Code postal',
      mandatory: true,
    },
    {
      type: 0,
      label: 'description',
      mandatory: false,
    },
  ],
};
