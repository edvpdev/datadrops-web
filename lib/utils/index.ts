export const isoToDateString = (iso: string) => {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    minute: '2-digit',
    hour: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
