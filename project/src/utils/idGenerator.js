let lastId = 0;

export const generateId = () => {
  lastId += 1;
  return `${Date.now()}-${lastId}`;
};