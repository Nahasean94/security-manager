import React from 'react'
import {timeSince} from "../../../shared/TimeSince"

class InboxView extends React.Component {
    constructor(props){
        super(props)
        this.selectLeaveRequest=this.selectLeaveRequest.bind(this)
    }
    selectLeaveRequest(e){
        e.preventDefault()
        this.props.onSelectLeaveRequest(this.props.inbox.id)
    }
    render() {

        const {id, body, author, timestamp} = this.props.inbox

        return (
            <div className="well" onClick={this.selectLeaveRequest}>
                <div className="row view-leave">
                    <div className="col-sm-2">
                        <img
                            src={`http://localhost:8080/uploads/${author.profile_picture}`}
                            width="50" height="50"
                            className="rounded-circle"/>
                    </div>
                    <div className="col-sm-10 view-leave">
                        <ul className="list-unstyled">
                        </ul>
                            <li>

                        <ul className="list-inline list-unstyled">
                                <li className="list-inline-item"> <strong>Leave request</strong></li>
                                <li className="list-inline-item pull-right">{timeSince(timestamp)}</li>
                            </ul>
                            </li>
                        <li>
                     {body.substr(0, 50)}...
                        </li>
                        <li className="feed-meta">{author.username}
                        </li>

                    </div>
                </div>
            </div>
        )
    }
}

export default InboxView