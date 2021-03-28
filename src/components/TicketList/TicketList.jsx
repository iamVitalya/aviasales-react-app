import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './TicketList.actions';

import Ticket from '../Ticket';
import ProgressLine from '../ProgressLine';

import ticketListClasses from './TiketList.module.scss';

const TicketList = ({ tickets, loading, fetchTickets }) => {
  useEffect(() => {
    fetchTickets()
  }, [fetchTickets]);
  
  const elements = tickets
    .filter(({ displayed }) => displayed)
    .slice(0, 10)
    .map(ticket => {
      if(!ticket.displayed) return null;

      return (
        <li className={ticketListClasses.item} key={ ticket.id } >
          <Ticket ticket={ ticket } />
        </li>
      )
    });

  if(elements.length === 0) {
    return (
      !loading && <div className={ticketListClasses.empty} >Рейсов, подходящих под заданные фильтры, не найдено</div>
    );
  }

  return (
    <>
      {loading && <div className={ ticketListClasses.loader } >
        <ProgressLine />
      </div>}
      
      <ul className={ticketListClasses.list} >{elements}</ul>
    </>
  );
}

TicketList.defaultProps = {
  tickets: [],
  loading: false,
  fetchTickets: () => null
};

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  fetchTickets: PropTypes.func
};

const mapStateToProps = ({ tickets, loading }) => {
  return {
    tickets,
    loading
  };
};

export default connect(mapStateToProps, actions)(TicketList);