function calculateDaysBetweenDates(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end - start;
  return Math.round(difference / (1000 * 60 * 60 * 24));
}