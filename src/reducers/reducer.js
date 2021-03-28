const initialState = {
  tickets: [],
  loading: false,
  sortValues: [{
    value: 'Самый дешевый',
    selected: true
  }, {
    value: 'Самый быстрый',
    selected: false
  }],
  filterValues: [{
    value: 'Все',
    selected: false
  }, {
    value: 'Без пересадок',
    selected: true
  }, {
    value: '1 пересадка',
    selected: false
  }, {
    value: '2 пересадки',
    selected: false
  }, {
    value: '3 пересадки',
    selected: false
  }]
};

const filterTickets = (tickets, filters) => {
  const filterValues = filters.filter(({ value, selected }) => {
    return value !== 'Все' && selected;
  }).map(({ value }) => {
    switch (value) {
      case 'Без пересадок':
        return 0;
      case '1 пересадка':
        return 1;
      case '2 пересадки':
        return 2;
      case '3 пересадки':
        return 3;
      default:
        return 0;
    }
  });

  return tickets.map(ticket => {
    const { segments } = ticket;
    const displayed = filterValues.some(filter => {
      return segments.some(({ stops }) => {
        return stops.length === filter;
      })
    });

    return {
      ...ticket,
      displayed
    };
  });
}

const sortTickets = (tickets, sorters) => {
  const sorterValue = sorters.find(({ selected }) => selected).value;
  
  return [...tickets].sort((ticketA, ticketB) => {
    if(sorterValue === 'Самый дешевый') {
      return ticketA.price - ticketB.price
    }

    if(sorterValue === 'Самый быстрый') {
      return ticketA.segments.reduce((sum, { duration }) => sum + duration, 0) 
        - ticketB.segments.reduce((sum, { duration }) => sum + duration, 0);
    }

    return 0;
  });
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (cc) => {
      // eslint-disable-next-line no-bitwise
      const rr = Math.random()*16|0; 
      // eslint-disable-next-line no-bitwise
      const vv = cc === 'x' ? rr : (rr&0x3|0x8);
      return vv.toString(16);
  });
}

const prepareTickets = (tickets, sortValues, filterValues) => {
  return sortTickets(filterTickets(tickets, filterValues), sortValues).map(ticket => {
    return {
      ...ticket,
      id: ticket.id || guid()
    }
  })
}

const reducer = (state = initialState, action) => {
  if(!action) {
    return state;
  }

  switch (action.type) {
    case 'CHANGE_SORT':
      return {
        ...state,
        sortValues: state.sortValues.map(sort => {
          return {
            ...sort,
            selected: sort.value === action.payload
          }
        })
      };
    case 'CHANGED_SORT':
      return {
        ...state,
        tickets: sortTickets(state.tickets, state.sortValues)
      }
    case 'CHANGE_FILTER':
      return {
        ...state,
        filterValues: state.filterValues.map(filter => {
          let { selected } = filter;
          const { value } = filter;
          const { value: newValue, selected: newSelected } = action.payload;
  
          if(newValue === 'Все') {
            selected = newSelected;
          }
  
          if(newValue !== 'Все' && newValue === value) {
            selected = newSelected;
          }
  
          return {
            ...filter,
            selected
          };
        }).map((filter, index, filters) => {
          let { selected } = filter;

          if(filter.value === 'Все' && action.payload.value !== 'Все') {
            selected = filters.every(({ value: lValue, selected: lSelected }) => {
              return lValue === 'Все' || lSelected;
            });
          }
          
          return {
            ...filter,
            selected
          }
        })
      };
    case 'CHANGED_FILTER':
      return {
        ...state,
        tickets: filterTickets(state.tickets, state.filterValues)
      }
    case 'LOADING_TICKETS':
      return {
        ...state,
        loading: true
      };
    case 'FETCHED_TICKETS':
      return {
        ...state,
        tickets: prepareTickets([ ...state.tickets, ...action.payload], state.sortValues, state.filterValues)
      };
    case 'LOADED_TICKETS':
      return {
        ...state,
        loading: false
      };
  
    default:
      return state;
  }
}

export default reducer;