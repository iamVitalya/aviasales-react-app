import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from './TicketFilter.actions';

import Checkbox from '../Checkbox';

import classes from "./TicketFilter.module.scss";

// eslint-disable-next-line no-unused-vars
const TicketFilter = ({ values, changeFilter, changedFilter }) => {
  const inputs = values.map(({ value, selected }) => {
    return (
      <Checkbox 
        value={ value } 
        checked={selected} 
        className={ classes.checkbox } 
        key={ value }
        onChange={(checked) => {
          changeFilter({
            value,
            selected: checked
          });

          changedFilter();
        }} />
    );
  });


  return (
    <div className={ classes.container } >
      <h2 className={ classes.title } >Количество пересадок</h2>
      <div>
        {inputs}
      </div>
    </div>
  );
}

TicketFilter.defaultProps = {
  values: [],
  changeFilter: () => null,
  changedFilter: () => null
};

TicketFilter.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    selected: PropTypes.bool
  })),
  changeFilter: PropTypes.func,
  changedFilter: PropTypes.func
};

const mapStateToProps = ({ filterValues }) => {
  return {
    values: filterValues
  }
};

export default connect(mapStateToProps, actions)(TicketFilter);