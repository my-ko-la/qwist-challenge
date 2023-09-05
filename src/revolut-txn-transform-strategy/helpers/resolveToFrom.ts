export const resolveToFrom = (amount: string | number) => {
  return Number(amount) > 0 ? 'from' : 'to';
};
