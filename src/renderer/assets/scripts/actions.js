export const updateCount = count => ({
  type: 'UPDATE_COUNT',
  count,
});

export const updateStatus = status => ({
  type: 'UPDATE_STATUS',
  status,
});

export const addList = object => ({
  type: 'ADD_LIST',
  object,
});
