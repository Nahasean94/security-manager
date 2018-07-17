import React, {Component} from 'react'
import {getInbox,} from "../../../shared/queries"
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {Consumer, Query} from "graphql-react"
import {isEmpty} from "lodash"
import Menu from '../Menu'
import PropTypes from "prop-types"
import CurrentGuard from "../../../shared/CurrentGuard"
import InboxView from "./InboxView"
import LeaveView from "./LeaveView"
import classnames from "classnames"

class Inbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaveRequest: ''
        }
        this.onSelectLeaveRequest = this.onSelectLeaveRequest.bind(this)
    }

    onSelectLeaveRequest(leaveRequest) {
        this.setState({leaveRequest})
    }


    render() {
       const {leaveRequest}=this.state
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-md-2 bd-sidebar">
                        <Menu router={this.context.router} active="inbox"/>

                    </div>
                    <div className="col-sm-5 col-md-5 col-xl-5 bd-content">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fetchOptionsOverride}
                            variables={{guard_id: CurrentGuard.getGuardId()}}
                            query={getInbox}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.getInbox && data.getInbox.length > 0) {
                                        return (<ul className="list-unstyled ">
                                            {data.getInbox.map(inbox => {
                                                return <li className={classnames("inbox-list", {"inbox-list-selected": inbox.id===this.state.leaveRequest})}>
                                                    <InboxView inbox={inbox} onSelectLeaveRequest={this.onSelectLeaveRequest}/>
                                                    {/*<hr className="inbox-list"/>*/}
                                                </li>
                                            })}
                                        </ul>)
                                    } else {
                                        return <p>No items on your inbox</p>
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
                    <div className="col-sm-4 col-md-4 col-xl-4 bd-location">
                        <LeaveView leaveRequest={leaveRequest}/>
                    </div>
                </div>
            </div>
        )

    }
}

Inbox.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Inbox

