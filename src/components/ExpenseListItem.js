import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt}) => {
    return (
        <div key={id}>
            <Link to={`edit?id=${id}`}>
                <h3>{description}</h3>
            </Link>
            <p>{amount} - {createdAt}</p>
        </div>
    );
}

export default ExpenseListItem;
