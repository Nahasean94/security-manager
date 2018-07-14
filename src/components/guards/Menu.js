import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap"

// export default () => {
//        return <nav className="bd-links" id="bd-docs-nav">
//                 <div>
//                     <Link to="/guards/profile"><h5>Profile</h5></Link>
//                 </div>
//                 <div>
//                     <Link to="/guards/inbox"><h5>Inbox</h5></Link>
//                 </div>
//                 <div>
//                     <Link to="/guards/leave"><h5>Leave Form </h5></Link>
//                 </div>
//                 <div>
//                     <Link to="/guards/retire"><h5>Retire Form</h5></Link>
//                 </div>
//                 <div>
//                     <Link to="/guards"><h5>Exit </h5></Link>
//                 </div>
//         </nav>

export default ({router, active}) => {
    const onProfileLink = (e) => {
        e.preventDefault()
        router.history.push("/guards/profile")
    }
    const onRetireLink = (e) => {
        e.preventDefault()
        router.history.push("/guards/retire")
    }
    const onLeaveLink = (e) => {
        e.preventDefault()
        router.history.push("/guards/leave")
    }
    const onInboxLink = (e) => {
        e.preventDefault()
        router.history.push("/guards/inbox")
    }
    const onReportsLink = (e) => {
        e.preventDefault()
        router.history.push("/guards/reports")
    }
    const onExitLink = (e) => {
        e.preventDefault()
        router.history.push("/guards")
    }
    return <Nav pills vertical  className="bd-links" id="bd-docs-nav">
        <NavItem>
            <NavLink href="" onClick={onProfileLink} active={active === 'profile'}>Profile</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onInboxLink} active={active === 'inbox'}>Inbox</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onReportsLink} active={active === 'reports'}>Reports</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onLeaveLink} active={active === 'leave'}>Leave form</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onRetireLink} active={active === 'retire'}>Retire form</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onExitLink} active={active === 'exit'}>Exit</NavLink>
        </NavItem>
    </Nav>


}
