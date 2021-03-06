import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, setTagFilter } from '../actions/filters';
import getTags from "../selectors/tags";

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));

    };
    onFocusChange = (calendarFocused) => {
        this.setState(()=> ({ calendarFocused }));
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Search expenses"
                            value={this.props.filters.text}
                            onChange={(e) => {
                                this.props.dispatch(setTextFilter(e.target.value));
                            }}
                        />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select-input"
                            value={this.props.filters.sortBy}
                            onChange={(e) => {
                                if (e.target.value === 'date') {
                                    this.props.dispatch(sortByDate());
                                } else if (e.target.value === 'amount') {
                                    this.props.dispatch(sortByAmount());
                                };
                            }}
                        >
                            <option value="date">Sort by Date</option>
                            <option value="amount">Sort by Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                            startDateId="startDateFilter"
                            endDateId="endDateFilter"
                            displayFormat="DD-MM-YYYY"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <select
                            className="select-input"
                            value={this.props.filters.tag}
                            onChange={(e) => {
                                this.props.dispatch(setTagFilter(e.target.value));
                            }}
                        >
                            <option value="">No Tag</option>
                            {
                                this.props.tags.length !== 0
                                &&
                                    this.props.tags.map(tag => (
                                        <option key={tag} value={tag}>{tag}</option>
                                    ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        tags: getTags(state.expenses).sort()
    }
}
export default connect(mapStateToProps)(ExpenseListFilters);
