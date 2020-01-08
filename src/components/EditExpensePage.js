import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => (
    <div>
        <ExpenseForm
            expense={props.expense}
            onSubmit={(expense) =>  {
                props.dispatch(editExpense(props.expense.id, expense));
                props.history.push('/');
            }
            }
        />
        <button onClick={() => {
            props.dispatch(removeExpense({id: props.expense.id}))
            props.history.push('/');
        }}>Remove</button>
    </div>
);

const mapStateToProps = (state, props) => ({expense: state.expenses.find(({id}) => id === queryString.parse(props.location.search).id)});

export default connect(mapStateToProps)(EditExpensePage);
