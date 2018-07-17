import React from 'react'
import {timeSince} from "../../../shared/TimeSince"

class InboxView extends React.Component {
    render() {
        const {id, body, author, timestamp} = this.props.inbox

        return (
            <div className="well ">
                <div className="row">
                    <div className="col-sm-2">
                        <img
                            src={`http://localhost:8080/uploads/${author.profile_picture}`}
                            width="50" height="50"
                            className="rounded-circle"/>
                    </div>
                    <div className="col-sm-10">
                            <ul className="list-inline list-unstyled">
                                <li className="list-inline-item"> <strong>Leave request</strong></li>
                                <li className="list-inline-item pull-right">{timeSince(timestamp)}</li>
                            </ul>
                                <p>{body.substr(0, 200)}...</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default InboxView