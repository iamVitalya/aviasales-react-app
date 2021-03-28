import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from './TicketSorter.actions';

import RadioGroup from '../RadioGroup';

const TicketSorter = ({ values, changeSort, changedSort }) => (
  <>
    <RadioGroup groupName="ticket-sorting" values={values} onChange={value => {
        changeSort(value);
        changedSort();
      }} />
  </>
);

TicketSorter.defaultProps = {
  values: [],
  changeSort: () => null,
  changedSort: () => null
};

TicketSorter.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    selected: PropTypes.bool
  })),
  changeSort: PropTypes.func,
  changedSort: PropTypes.func
};

const mapStateToProps = ({ sortValues }) => {
  return {
    values: sortValues
  }
}

export default connect(mapStateToProps, actions)(TicketSorter);