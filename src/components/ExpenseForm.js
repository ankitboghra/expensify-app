import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import InputTags from './InputTags';
import getTags from "../selectors/tags";

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount.toString() : '',
            tags: props.expense && props.expense.tags ?  props.expense.tags : [],
            tagInput: props.expense ? props.expense.tagInput : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;

        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onTagInputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            e.preventDefault();
            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ tags: [...this.state.tags, val] });
            this.setState({tagInput: ''});
        } else if (e.key === 'Backspace' && !val) {
            this.onTagRemove(this.state.tags.length - 1);
        }
    };
    onTagValueChange = (e) => {
        this.setState({tagInput: e.target.value})
    }
    onTagRemove = (i) => {
        const newTags = [ ...this.state.tags ];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    };
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount'}))
        } else {
            this.setState(() => ({ error: ''}))

            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
                tags: this.state.tags,
            })
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    className="text-input"
                    placeholder="Description"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    displayFormat="DD-MM-YYYY"
                />
                <InputTags
                    tags={this.state.tags}
                    onTagInputKeyDown={this.onTagInputKeyDown}
                    onTagRemove={this.onTagRemove}
                    tagInput={this.state.tagInput}
                    onTagValueChange={this.onTagValueChange}
                    dataList={this.props.tagsList}
                />
                <textarea
                    className="textarea-input"
                    placeholder="Add a note for your expense (optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                ></textarea>
                <div>
                    <button className="button">{this.props.expense ? 'Save Expense' : 'Add Expense'}</button>
                </div>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        tagsList: getTags(state.expenses).sort()
    }
}
export default connect(mapStateToProps)(ExpenseForm);
