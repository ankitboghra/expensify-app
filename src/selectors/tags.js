const getTags = (expenses) => {
    const tags = new Set();

    expenses
    .forEach(expense => 
        expense.tags && expense.tags.map(tag => tags.add(tag))    
    );
    
    return [...tags];
};

export default getTags;
