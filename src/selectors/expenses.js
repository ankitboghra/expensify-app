import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate, tag }) => {
    return expenses.filter((expense)=>{
        const createdAtMoment = moment(expense.createdAt);

        const  startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const  endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        const tagMatch = () => {
            if(!tag)
                return true;
            return expense.tags && expense.tags.includes(tag)};

        return startDateMatch && endDateMatch && textMatch && tagMatch();
    }).sort((a, b)=>{
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export default getVisibleExpenses;
