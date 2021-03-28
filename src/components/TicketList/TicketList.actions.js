export const fetchedTickets = (tickets) => ({ type: 'FETCHED_TICKETS', payload: tickets });
export const loadingTickets = () => ({ type: 'LOADING_TICKETS' });
export const loadedTickets = () => ({ type: 'LOADED_TICKETS' });

const getSearchId = (() => {
  let searchId = null;

  return async () => {
    if(searchId !== null) return searchId;

    const responseSearchId = await fetch('https://front-test.beta.aviasales.ru/search');
    const { searchId: sId } = await responseSearchId.json();

    searchId = sId;

    return searchId
  }
})();

const loadTickets = async (dispatch) => {
  try {
    const searchId = await getSearchId();

    const responseTickets = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    const { tickets, stop } = await responseTickets.json();

    dispatch(fetchedTickets(tickets));

    if(!stop) {
      loadTickets(dispatch);
    } else {
      dispatch(loadedTickets());
    }
  } catch (error) {
    loadTickets(dispatch);
  }
  
}

export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch(loadingTickets());

    loadTickets(dispatch);
  }
}

export default { fetchTickets };