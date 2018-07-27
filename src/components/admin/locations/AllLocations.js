import React, {Component} from 'react'
import {getAllLocations,} from "../../../shared/queries"
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {Consumer, Query} from "graphql-react"
import {isEmpty} from "lodash"
import Menu from '../Menu'
import LocationView from "./LocationView"
import NewLocationForm from "./NewLocationForm"
import LocationDetails from "./LocationDetails"
import PropTypes from 'prop-types'

let allLocations=[]
class AllLocations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            showNewLocationModal: false,
            locations: [],
            loading: false,
            error: false
        }
        this.onSelectLocation = this.onSelectLocation.bind(this)
        this.showNewLocationModal = this.showNewLocationModal.bind(this)
        this.closeNewLocationModal = this.closeNewLocationModal.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSelectLocation(id, name) {
        this.setState({id, name})
    }
    onChange(e) {
       this.setState({locations:[]})
        let arr_results = []
        for (let i = 0; i < allLocations.length; i++) {
            let exp = new RegExp(e.target.value, 'i')
            if (String(allLocations[i].name).match(exp)) {
                arr_results.push(allLocations[i])
            }
        }
        this.setState({locations:arr_results})
    }
    componentDidMount() {
        this.setState({errors: {}, isLoading: true})
        this.props.graphql
            .query({
                fetchOptionsOverride: fetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    query: getAllLocations
                }
            }).request.then(({loading, data}) => {
            if (data) {
                if (data.getAllLocations && data.getAllLocations.length > 0) {
                    this.setState({locations: data.getAllLocations, loading: false, error: false})
                    allLocations=data.getAllLocations
                }
            }
            else if (loading) {
                this.setState({loading: true})
            }
            else {
                this.setState({error: true})
            }
        })
    }

    showNewLocationModal() {
        this.setState({showNewLocationModal: true})
    }

    closeNewLocationModal() {
        this.setState({showNewLocationModal: false})
    }


    render() {
        const {loading, locations, error} = this.state
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-md-2 bd-sidebar">
                        <Menu router={this.context.router} active="locations"/>
                    </div>
                    <div className="col-sm-5 col-md-5 col-xl-5 bd-content">
                        <button className="btn btn-sm btn-dark" onClick={this.showNewLocationModal}>New location
                        </button>
                        <br/>
                        <hr/>
                        {/*<div className="col-sm-6">*/}
                            <form>
                                <div className="input-group row">
                                    <input type="text" className="form-control form-control-sm col-sm-8 offset-sm-1"
                                           placeholder="Search Location"
                                           aria-label="Search Location" aria-describedby="basic-addon1"
                                           onChange={this.onChange}/>

                                </div>
                            </form>
                        {/*</div>*/}
                {/*</div>*/}
                    <hr/>

                        <Consumer>{graphql => <NewLocationForm graphql={graphql} show={this.state.showNewLocationModal}
                                                               onClose={this.closeNewLocationModal}/>}</Consumer>

                        {loading ? <p>Loading...</p> : error ? <p>error occured. Reload page to try again</p>
                            : <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {locations.length > 0 ?
                                    locations.map(location => {
                                        return <LocationView location={location}
                                                             onSelectLocation={this.onSelectLocation}/>

                                    })
                                    : <p>No locations found</p>
                                }
                                </tbody>
                            </table>
                        }

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
export default () => <Consumer>{graphql => <AllLocations graphql={graphql}/>}</Consumer>

