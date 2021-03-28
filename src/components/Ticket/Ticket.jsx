import React from 'react';
import PropTypes from 'prop-types';

import { format, addMinutes }  from 'date-fns';
import { ru } from 'date-fns/locale'

import classes from './Ticket.module.scss';

const priceFormatter = (price) => {
  return `${price.toLocaleString()} р`;
}

const stopsFormatter = (stops) => {
  return stops.join(', ');
}

const countStopsFormatter = (stops) => {
  const count = stops.length;

  switch (count) {
    case 0:
      return 'Без пересадок';
    case 1:
      return '1 пересадка';
    case 2:
    case 3:
      return `${count} пересадки`;
    default:
      return `${count} пересадки(ок)`
  }
}

const durationFormatter = (duration) => {
  return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
}

const dateFormatter = (date) => {
  return format(date, 'HH:mm', {
    locale: ru
  });
}

const Ticket = ({ ticket }) => {
  const { price, segments, carrier } = ticket;
  const rows = segments.map(({ origin, destination, stops, duration, date }) => {
    const title = `${origin} - ${destination}`;

    return (
      <table className={classes.path} key={title} >
        <tbody>
          <tr>
            <th className={classes.path__title} >{title}</th>
            <th className={classes.path__title} >В пути</th>
            <th className={classes.path__title} >{countStopsFormatter(stops)}</th>
          </tr>
          <tr>
            <td className={classes.path__text} >{`${dateFormatter(new Date(date))} - ${dateFormatter(addMinutes(new Date(date), duration))}`}</td>
            <td className={classes.path__text} >{durationFormatter(duration)}</td>
            <td className={classes.path__text} >{stopsFormatter(stops)}</td>
          </tr>
        </tbody>
      </table>
    )
  })

  return (
    <article className="tiket">
      <header className={classes.header} >
        <h2 className={classes.price} >{priceFormatter(price)}</h2>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="Логотип" />
      </header>
      {rows}
    </article>
  );
}

Ticket.defaultProps = {
  ticket: {}
};

Ticket.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number,
    carrier: PropTypes.string,
    segments: PropTypes.arrayOf(PropTypes.shape({
      origin: PropTypes.string,
      destination: PropTypes.string,
      date: PropTypes.string,
      stops: PropTypes.arrayOf(PropTypes.string),
      duration: PropTypes.number
    }))
  })
}

export default Ticket;