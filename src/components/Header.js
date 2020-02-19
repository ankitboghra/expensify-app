import React from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import { startLogout } from '../actions/auth';

const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact>Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
        <NavLink to="/help" activeClassName="is-active">Help</NavLink>
        <button onClick={startLogout}>LogOut</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);