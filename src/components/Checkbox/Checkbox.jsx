import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import classes from './Checkbox.module.scss';

const Checkbox = ({ value, checked, className, onChange }) => {
  const classNames = cn([
    className,
    classes.container
  ]);

  return (
    <label className={ classNames } key={value} >
      <input 
        type="checkbox" 
        className={ classes.input } 
        checked={checked} 
        onChange={(event) => {
          onChange(event.target.checked);
        }} />
      <span className={ classes.mark } />
      {value}
    </label>
  )
};

Checkbox.defaultProps = {
  value: '',
  checked: false,
  className: '',
  onChange: () => null
};

Checkbox.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Checkbox;