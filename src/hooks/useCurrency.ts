/**
 * @description Get local time
 */
export function useCurrency() {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const format = (value) => {
    return formatter.format(value);
  };

  return { format };
}
