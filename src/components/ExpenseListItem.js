import React from 'react';

const ExpenseListItem = ({id, description, amount, createdAt}) => {
    return (
        <div key={id}>
            <h3>{description}</h3>
            <p>{amount} - {createdAt}</p>
        </div>
    );
}

export default ExpenseListItem;