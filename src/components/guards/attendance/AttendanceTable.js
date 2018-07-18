import React from 'react'
import CurrentGuard from "../../../shared/CurrentGuard"
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import classnames from "classnames"
import {Query} from "graphql-react"
import {getGuardAttendance} from "../../../shared/queries"
import AttendanceView from "./AttendanceView"
import Menu from "../Menu"

class AttendanceTable extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-md-2 bd-sidebar">
                        <Menu router={this.context.router} active="attendance"/>
                    </div>
                    <div className="col-sm-7 col-md-7 col-xl-7 bd-content">
            <Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={fetchOptionsOverride}
                variables={{guard_id: CurrentGuard.getGuardId()}}
                query={getGuardAttendance}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.getGuardAttendance && data.getGuardAttendance.length > 0) {
                            return (
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Sign in</th>
                                        <th scope="col">Sign out</th>
                                        <th scope="col">Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                {data.getGuardAttendance.map(attendance => {
                                    return <AttendanceView attendance={attendance}/>

                                })}
                                    </tbody>
                            </table>)
                        } else {
                            return <p>No attendance records found</p>
                        }
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>Loading failed.</p>
                }
                }
            </Query>
                    </div>
                </div>
            </div>
        )
    }
}

export default AttendanceTable