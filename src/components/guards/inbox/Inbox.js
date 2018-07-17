import React, {Component} from 'react'
import {getInbox,} from "../../../shared/queries"
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {Consumer, Query} from "graphql-react"
import {isEmpty} from "lodash"
import Menu from '../Menu'
import PropTypes from "prop-types"
import CurrentGuard from "../../../shared/CurrentGuard"

class Inbox extends Component {
    constructor(props) {
        super(props)

    }



    render() {
        console.log(CurrentGuard.getGuardId())
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-md-2 bd-sidebar">
                        <Menu router={this.context.router} active="inbox"/>

                    </div>
                    <div className="col-sm-7 col-md-7 col-xl-7 bd-content">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fetchOptionsOverride}
                            variables={{guard_id:CurrentGuard.getGuardId()}}
                            query={getInbox}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.getInbox && data.getInbox.length > 0) {
                                        return (<ul>
                                            {data.getInbox.map(inbox=>{
                                                return <li>{inbox.author.username}<br/>{inbox.body}</li>
                                            })}
                                        </ul>)
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

Inbox.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Inbox

