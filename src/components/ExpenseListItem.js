import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt, tags }) => {
    return (
        <Link className="list-item" to={`edit?id=${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{moment(createdAt).format('Do MMMM YYYY')}</span>
                <span className="list-item__sub-title">{tags && ` (${tags.join(', ')})`}</span>
            </div>
            <h3 className="list-item__data">&#8377; {numeral(amount).format('Rs 0,0.00')}</h3>
        </Link>
    );
}

export default ExpenseListItem;
