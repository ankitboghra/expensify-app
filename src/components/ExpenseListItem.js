import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt}) => {
    return (
        <div key={id}>
            <Link to={`edit?id=${id}`}>
                <h3>{description}</h3>
            </Link>
            <p>
                Rs {numeral(amount).format('Rs 0,0.00')}
                 - 
                {moment(createdAt).format('Do MMMM YYYY')}
            </p>
        </div>
    );
}

export default ExpenseListItem;
