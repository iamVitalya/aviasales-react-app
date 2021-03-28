import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import classes from './RadioGroup.module.scss';

function RadioGroup({ groupName, values, onChange }) {
  
  const elements = values.map(({ value, selected }) => {
    const className = cn(classes.item, {
      [classes['item--selected']]: selected
    });

    return (
      <li className={ className } key={value} >
        <label className={classes.label} >
          <input 
              type="radio"
              name={groupName}
              value={value}
              className={classes.input}
              onChange={() => {
                onChange(value);
              }} />
            {value}
        </label>
      </li>
    )
  });

  return (
    <ul className={ classes.list }>{elements}</ul>
  );
}

RadioGroup.defaultProps = {
  groupName: '',
  values: [],
  onChange: () => null
};

RadioGroup.propTypes = {
  groupName: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    selected: PropTypes.bool
  })),
  onChange: PropTypes.func
};

export default RadioGroup;