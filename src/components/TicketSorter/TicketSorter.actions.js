export const changeSort = (payload) => ({ type: 'CHANGE_SORT', payload });
export const changedSort = () => ({ type: 'CHANGED_SORT' });

export default { changeSort, changedSort };