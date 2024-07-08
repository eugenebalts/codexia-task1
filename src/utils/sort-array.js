export const sortArray = (array, sortBy, order) => {
  return array.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else if (order === 'desc') {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    } else {
      return 0;
    };
  });
};