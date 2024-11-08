export const getDateTimestamp = (date: string | undefined): number => {
  if (!date) return 0;
  return new Date(date).getTime();
};
