export const formatCurrency = ({ amount, currency }) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
