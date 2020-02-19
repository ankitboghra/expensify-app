import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './firebase/firebase';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('appRoot'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('appRoot'));
});
