import React, {Component} from 'react'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {signin} from "../../shared/queries"
import {fetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {dbPromise} from './indexDB'
import {Consumer, Query} from "graphql-react"
import {isEmpty} from "lodash"
import bcrypt from 'bcryptjs-then'
import validator from '../../../node_modules/validator/index.js'
import classnames from "classnames"

class ApplyForLeave extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            duration: '',
            message: '',
            guards: [],
            errors: {},
            isLoading: false,
            invalid: false,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    validateInfo(data) {
        let errors = {}
        if (validator.isEmpty(data.duration)) {
            errors.duration = 'This field is required'
        }
        if (!data.date) {
            errors.date = 'This field is required'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInfo(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }


    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            const {date, duration} = this.state
            dbPromise.then(db => {
                let tx = db.transaction('guards', 'readonly')
                let store = tx.objectStore('guards')
                return store.get(Number(date))
            }).then(guard => {
                if (guard) {
                    bcrypt.compare(duration, guard.duration).then(valid => {
                        if (valid) {
                            this.setState({
                                date: '',
                                duration: '',
                                errors: {},
                                guards: [...this.state.guards, guard.first_name]
                            })
                            const signedIn = {
                                date: date,
                                signin: new Date().toLocaleString(),
                                signout: '',
                                date: new Date().toLocaleDateString()
                            }
                            dbPromise.then(db => {
                                let tx = db.transaction('attendance', 'readwrite')
                                let store = tx.objectStore('attendance')
                                return store.add(signedIn)
                            }).then(added => {
                                this.props.graphql
                                    .query({
                                        fetchOptionsOverride: fetchOptionsOverride,
                                        resetOnLoad: true,
                                        operation: {
                                            variables: {
                                                date: signedIn.date,
                                                signin: signedIn.signin,
                                                date: signedIn.date
                                            },
                                            query: signin
                                        }
                                    })
                                    .request.then(({data}) => {
                                        if (data) {
                                            console.log(data)
                                        }
                                    }
                                )
                            })
                        } else {
                            let errors = {}
                            errors.duration = 'Incorrect duration'
                            this.setState({errors})
                        }
                    })
                } else {
                    let errors = {}
                    errors.date = 'Guard ID Not Found'
                    this.setState({errors})
                }
            })
        }
    }


    render() {
        const {guards, errors, isLoading, showGuardModal} = this.state
        const messageError = errors.message
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="col-2 col-md-2 ">
                        {/*<h3>Signed in</h3>*/}
                        {/*<ul className="list-unstyled">*/}
                        {/*{guards.map(guard => {*/}
                        {/*return <li><a href="" className="nav navbar-brand names"*/}
                        {/*onClick={this.showGuardModal}> {guard}</a>*/}
                        {/*<div className="feed-meta">*/}
                        {/*<ul className="list-inline">*/}
                        {/*</ul>*/}
                        {/*</div>*/}
                        {/*</li>*/}
                        {/*})}*/}
                        {/*<a href="" className="nav navbar-brand names"*/}
                        {/*onClick={this.showGuardModal}> Sean</a>*/}
                        {/*</ul>*/}
                    </div>
                    <div className="col-7 col-md-7 col-xl-7 bd-content">
                        <h2>Apply for leave</h2>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    label="Starting date"
                                    type="date"
                                    name="date"
                                    value={this.state.date}
                                    onChange={this.onChange}
                                    error={errors.date}
                                />
                                <TextFieldGroup
                                    label="Duration of leave(days)"
                                    type="number"
                                    name="duration"
                                    value={this.state.duration}
                                    onChange={this.onChange}
                                    error={errors.duration}
                                />
                                <div className="form-group row">
                                    <div className="col-sm-3"><label htmlFor="message">Reason for leave</label>
                                    </div>
                                    <div className="col-sm-9">
                        <textarea name="message" onChange={this.onChange}
                                  className={classnames("form-control form-control-sm", {"is-invalid": messageError})}
                                  rows="3" id="message" onClick={this.onChange} value={this.state.message}/>
                                        {messageError && <div className="invalid-feedback">{messageError}</div>}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-5 offset-sm-3">
                                        <input type="submit" value="Apply"
                                               className="form-control btn btn-secondary btn-sm "/>
                                    </div>
                                    {/*<Dropdown group  isOpen={this.state.dropdownOpen} size="sm"*/}
                                    {/*toggle={this.toggle}>*/}
                                    {/*<DropdownToggle caret>*/}
                                    {/*More actions*/}
                                    {/*</DropdownToggle>*/}
                                    {/*<DropdownMenu>*/}
                                    {/*<DropdownItem>View inbox</DropdownItem>*/}
                                    {/*<DropdownItem divider/>*/}
                                    {/*<DropdownItem>Apply for leave</DropdownItem>*/}
                                    {/*<DropdownItem divider/>*/}
                                    {/*<DropdownItem>Apply for retirement</DropdownItem>*/}
                                    {/*</DropdownMenu>*/}
                                    {/*</Dropdown>*/}
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        )

    }
}


export default ApplyForLeave

