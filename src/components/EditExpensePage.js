import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

const EditExpensePage = (props) => (
    <div>
        <ExpenseForm
            expense={props.expense}
            onSubmit={(expense) =>  {
                props.dispatch(startEditExpense(props.expense.id, expense));
                props.history.push('/dashboard');
            }
            }
        />
        <button onClick={() => {
            props.dispatch(startRemoveExpense({id: props.expense.id}))
            props.history.push('/dashboard');
        }}>Remove</button>
    </div>
);

const mapStateToProps = (state, props) => ({expense: state.expenses.find(({id}) => id === queryString.parse(props.location.search).id)});

export default connect(mapStateToProps)(EditExpensePage);
