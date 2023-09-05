export const toUnifiedTxnFormat = (amount: string | number) => {
  return String(Number(amount).toFixed(2));
};
