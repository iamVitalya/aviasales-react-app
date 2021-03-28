export const changeFilter = (payload) => ({ type: 'CHANGE_FILTER', payload });
export const changedFilter = () => ({ type: 'CHANGED_FILTER' });

export default { changeFilter, changedFilter };