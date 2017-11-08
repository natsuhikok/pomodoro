export const updateCount = count => ({
  type: 'UPDATE_COUNT',
  count,
});

export const updateStatus = status => ({
  type: 'UPDATE_STATUS',
  status,
});

export const updateEnd = end => ({
  type: 'UPDATE_END',
  end,
});

export const updateList = object => ({
  type: 'UPDATE_LIST',
  object,
});
