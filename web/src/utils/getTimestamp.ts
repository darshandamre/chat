export const getTimestamp = (createdAt: string): string => {
  const now = new Date();
  const timestamp = new Date(Number(createdAt));

  if (
    now.toDateString().slice(4, 16) === timestamp.toDateString().slice(4, 16)
  ) {
    return `today at ${timestamp.toTimeString().slice(0, 5)}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    yesterday.toDateString().slice(4, 16) ===
    timestamp.toDateString().slice(4, 16)
  ) {
    return `yesterday at ${timestamp.toTimeString().slice(0, 5)}`;
  }

  return `${timestamp.toLocaleDateString()}`;
};
