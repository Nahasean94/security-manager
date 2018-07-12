import React, {Component} from 'react'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {findGuardsInLocation, locations} from "../../shared/queries"
import {fetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {dbPromise} from './indexDB'
import {Query} from "graphql-react"
import Select from 'react-select'
// const {ipcRenderer} = window.require('electron')

let locationOptions

class GuardsHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guard_id: '',
            password: '',
            guards: [],
            location: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
    }

    handleLocationChange = (location) => {
        this.setState({location})
        this.props.graphql
            .query({
                fetchOptionsOverride: fetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    variables: {id: location.value},
                    query: findGuardsInLocation
                }
            })
            .request.then(({data}) => {
                if (data) {
                    // dbPromise.then(function (db) {
                    //     let tx = db.transaction('guards', 'readonly')
                    //     let store = tx.objectStore('guards')
                    //     return store.get(4545)
                    // }).then(function (val) {
                    //
                    // })
                    if (data.findGuardsInLocation.length > 0) {
                        dbPromise.then(function (db) {
                            let tx = db.transaction('guards', 'readwrite')
                            let store = tx.objectStore('guards')
                            return data.findGuardsInLocation.map(guard => {
                                return store.add(guard)
                            })
                        }).then(sth=>{
                            console.log("sdfsd",sth)
                        })
                    }
                }
            }
        )
    }

    // componentDidMount() {
    //     this.props.graphql
    //         .query({
    //             fetchOptionsOverride: fetchOptionsOverride,
    //             resetOnLoad: true,
    //             operation: {
    //                 variables: {guard_id: '5b3f9fa2f9cf5c2a64af648d'},
    //                 query: findGuardsInLocation
    //             }
    //         })
    //         .request.then(({data}) => {
    //             if (data) {
    //                 dbPromise.then(function (db) {
    //                     let tx = db.transaction('guards', 'readonly')
    //                     let store = tx.objectStore('guards')
    //                     return store.get(4545)
    //                 }).then(function (val) {
    //
    //                 })
    //             }
    //         }
    //     )
    // }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }


    onSubmit(e) {
        e.preventDefault()
        // ipcRenderer.send('get-guard', {guard_id: this.state.guard_id    , password: this.state.password})
        // ipcRenderer.on('got-guard', (event, guard) => {
        //     if (guard) {
        //         this.setState({guards: [...this.state.guards, guard.first_name + " " + guard.last_name]})
        //         ipcRenderer.send('sign-in', {guard: guard, time: new Date()})
        //     }
        // })
        this.setState({guard_id: '', password: ''})
    }


    render() {
        const {guards} = this.state
        return (
            <div>
                <div className="container-fluid">
                    <div className="row flex-xl-nowrap">
                        <div className="col-2 col-md-2 bd-sidebar">
                            <h3>Signed in</h3>
                            <ul className="list-unstyled">
                                {guards.map(guard => {
                                    return <li className=""><strong className="names">{guard}</strong>
                                        <div className="feed-meta">
                                            <ul className="list-inline">
                                                <li className="list-inline-item ">ere</li>
                                                <li className="list-inline-item ">ere</li>
                                            </ul>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div className="col-4 col-md-4 col-xl-4 offset-1 bd-content">
                            <div className="sign-in-form">
                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        label="Guard ID"
                                        type="number"
                                        name="id"
                                        value={this.state.guard_id}
                                        onChange={this.onChange}
                                    />
                                    <TextFieldGroup
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    <div className="form-group row">
                                        <div className="col-sm-9 offset-sm-3">
                                            <input type="submit" value="Sign in"
                                                   className="form-control btn btn-secondary btn-sm "/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-3 offset-2  bd-location">
                            <h3>Select location</h3>
                            <Query
                                loadOnMount
                                loadOnReset
                                fetchOptionsOverride={fetchOptionsOverride}
                                query={locations}
                            >
                                {({loading, data}) => {
                                    if (data) {
                                        locationOptions = data.locations.map(location => {
                                            return {
                                                label: location.name,
                                                value: location.id
                                            }
                                        })
                                        return <Select.Creatable
                                            closeOnSelect={true}
                                            onChange={this.handleLocationChange}
                                            options={locationOptions}
                                            placeholder="Search locations"
                                            removeSelected={true}
                                            value={this.state.location}/>
                                    }
                                    else if (loading) {
                                        return <p>Loading…</p>
                                    }
                                    return <p>Loading failed.</p>
                                }
                                }
                            </Query>
                            <br/>
                            <strong>Location: </strong>{this.state.location ? this.state.location.label : 'no location set'}
                        </div>
                    </div>
                </div>
            </div>)

    }
}


export default GuardsHome

