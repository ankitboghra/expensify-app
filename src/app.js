import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './firebase/firebase';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.dispatch(addExpense({description: 'Rent', amount: 200, createdAt: 5}));
store.dispatch(addExpense({description: 'Tea', amount: 500, createdAt: -1000}));
store.dispatch(addExpense({description: 'Water', amount: 400, createdAt: 1000}));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('appRoot'));