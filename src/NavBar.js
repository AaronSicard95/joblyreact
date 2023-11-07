import React from "react"
import {NavLink} from "react-router-dom"
import {Navbar, Nav, NavItem} from "reactstrap"

function NavBar(props){
    const user= props.user?props.user:null;
    console.log(user);
    return <div>
        <Navbar>
            <NavLink to="/">Jobly</NavLink>

            <Nav>
                <NavItem>
                    <NavLink to="/companies">Companies </NavLink>
                    <NavLink to="/jobs">Jobs </NavLink>
                    {user?<NavLink to={`/user/edit`}>{user.username} </NavLink>:null}
                    {user?<NavLink to="/logout" onClick={props.logout} >Log Out </NavLink>:<NavLink to='/login'>LogIn/Register</NavLink>}
                </NavItem>
            </Nav>
        </Navbar>
    </div>
}

export default NavBar;