export const formatCurrency = (value: number, currency: string): string => {
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    console.error(error);
    return value.toString();
  }
};

export const formatDate = (isoFormattedString: string): string => {
  if (!isoFormattedString) return "";

  const constructedDate = new Date(isoFormattedString);
  const date = Number.isNaN(constructedDate.getTime())
    ? new Date(`${isoFormattedString}T00:00:00Z`)
    : constructedDate;

  if (Number.isNaN(date.getTime())) isoFormattedString;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};


