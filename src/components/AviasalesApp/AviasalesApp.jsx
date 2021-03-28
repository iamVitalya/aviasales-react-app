import React from 'react';

import cn from 'classnames';

import TicketSorter from '../TicketSorter';
import TicketList from '../TicketList';
import TicketFilter from "../TicketFilter";

import classes from './AviasalesApp.module.scss';

import logo from '../../images/logo.svg';

const AviasalesApp = () => {
  return (
    <div className={ classes.container } >
      <header className={ cn([ classes['content-wrapper'], classes.header ]) } >
        <img src={logo} alt="logo" className={ classes.logo } />
      </header>

      <div className={ cn([ classes['content-wrapper'], classes.content ]) } >
        <aside className={ classes.sidebar } >
          <TicketFilter />
        </aside>
        <main className={ classes.main } >
          <div className={ classes.sorter } >
            <TicketSorter />
          </div>
          <TicketList />
        </main>
      </div>
    </div>
  );
}

export default AviasalesApp;