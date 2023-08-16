export const getYear = (dateStr?: string) => {
  let date = new Date();

  if (dateStr) date = new Date(dateStr ?? '');

  return date.getFullYear();
};
