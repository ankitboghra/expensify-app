import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.dispatch(addExpense({description: 'Rent', amount: 200, createdAt: 1000}));
store.dispatch(addExpense({description: 'Tea', amount: 300, createdAt: -1000}));

store.dispatch(setTextFilter('rent'));

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

ReactDOM.render(<AppRouter />, document.getElementById('appRoot'));