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

export const addList = object => ({
  type: 'ADD_LIST',
  object,
});

export const updateMemo = (memo, id) => ({
  type: 'UPDATE_MEMO',
  memo,
  id,
});

export const updatePlace = (place, id) => ({
  type: 'UPDATE_PLACE',
  place,
  id,
});
