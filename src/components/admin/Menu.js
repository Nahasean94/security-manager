import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap"


export default ({router, active}) => {
    const onGuardsLink = (e) => {
        e.preventDefault()
        router.history.push("/admin/guards")
    }
    const onLocationsLink = (e) => {
        e.preventDefault()
        router.history.push("/admin/locations")
    }
    const onInboxLink = (e) => {
        e.preventDefault()
        router.history.push("/")
    }
    // const onInboxLink = (e) => {
    //     e.preventDefault()
    //     router.history.push("/guards/inbox")
    // }
    // const onReportsLink = (e) => {
    //     e.preventDefault()
    //     router.history.push("/guards/reports")
    // }
    // const onExitLink = (e) => {
    //     e.preventDefault()
    //     router.history.push("/guards")
    // }
    const onAttendanceLink = (e) => {
        e.preventDefault()
        router.history.push("/guards/attendance")
    }
    return <Nav pills vertical  className="bd-links" id="bd-docs-nav">
        <NavItem>
            <NavLink href="" onClick={onInboxLink} active={active === 'inbox'}>Inbox</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onGuardsLink} active={active === 'guards'}>Guards</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onLocationsLink} active={active === 'locations'}>Locations</NavLink>
        </NavItem>
        {/*<NavItem>*/}
            {/*<NavLink href="" onClick={onReportsLink} active={active === 'reports'}>Report form</NavLink>*/}
        {/*</NavItem>*/}
        {/*<NavItem>*/}
            {/*<NavLink href="" onClick={onLeaveLink} active={active === 'leave'}>Leave form</NavLink>*/}
        {/*</NavItem>*/}
        {/*<NavItem>*/}
            {/*<NavLink href="" onClick={onExitLink} active={active === 'exit'}>Exit</NavLink>*/}
        {/*</NavItem>*/}
    </Nav>


}
