import { formatDistanceToNow } from 'date-fns';

export const formatTimestamp = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};