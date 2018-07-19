import React, {Component} from 'react'
import {getAllLocations,} from "../../../shared/queries"
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {Consumer, Query} from "graphql-react"
import {isEmpty} from "lodash"
import Menu from '../Menu'
import PropTypes from "prop-types"
import LocationView from "./LocationView"
import LocationDetails from "./LocationDetails"

class AllLocations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            showCustomLocationModal: false
        }
        this.onSelectLocation = this.onSelectLocation.bind(this)
        this.showCustomLocationModal = this.showCustomLocationModal.bind(this)
        this.closeCustomLocationModal = this.closeCustomLocationModal.bind(this)
    }

    onSelectLocation(id,name) {
        this.setState({id,name})
    }

    showCustomLocationModal() {
        this.setState({showCustomLocationModal: true})
    }

    closeCustomLocationModal() {
        this.setState({showCustomLocationModal: false})
    }


    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-md-2 bd-sidebar">
                        <Menu router={this.context.router} active="locations"/>
                    </div>
                    <div className="col-sm-5 col-md-5 col-xl-5 bd-content">
                        <button className="btn btn-sm btn-dark" onClick={this.showCustomLocationModal}>New location</button>
                        <br/>
                        <br/>
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fetchOptionsOverride}
                            // variables={{id: CurrentLocation.getLocationId()}}
                            query={getAllLocations}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.getAllLocations && data.getAllLocations.length > 0) {
                                        return (
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {data.getAllLocations.map(location => {
                                                    return <LocationView location={location} onSelectLocation={this.onSelectLocation}/>

                                                })}
                                                </tbody>
                                            </table>)
                                    } else {
                                        return <p>No locations found</p>
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
                    <div className="col-sm-5 col-md-5 col-xl-5 bd-location">
                        <div className="row">
                            <div className="offset-sm-1">
                                <LocationDetails location={this.state.id} name={this.state.name}/></div>
                        </div>

                    </div>
                </div>

            </div>
        )

    }
}

AllLocations.contextTypes = {
    router: PropTypes.object.isRequired
}
export default AllLocations

