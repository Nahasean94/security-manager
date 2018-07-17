import React from 'react'
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {getLeaveRequest} from "../../../shared/queries"
import {Query} from "graphql-react"

class LeaveView extends React.Component {
    render() {
        const {leaveRequest} = this.props
        if (leaveRequest) {
            return <Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={fetchOptionsOverride}
                variables={{id: leaveRequest}}
                query={getLeaveRequest}
            >
                {({loading, data}) => {
                    if (data) {
                        const {id, body, author, replies, timestamp} = data.getLeaveRequest
                        return <div>
                            <h4>Leave Request</h4>
                            <hr/>
                            <div className="row view-leave">
                                <div className="col-sm-3">
                                    <img
                                        src={`http://localhost:8080/uploads/${author.profile_picture}`}
                                        width="90" height="90"
                                        className="rounded-circle"/>
                                </div>
                                <div className="col-sm-9">
                                    <ul className="list-unstyled">
                                        <li><strong>{author.username}</strong></li>
                                        <li>
                                            <strong>Date: </strong>&nbsp;{new Date(timestamp).toLocaleString()}</li>
                                    </ul>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <p>{body}...</p>
                            <hr/>
                            <h5>Replies</h5>
                        </div>
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>Loading failed.</p>
                }}

            </Query>
        }
        return <p>Select an item to read</p>
    }
}

export default LeaveView