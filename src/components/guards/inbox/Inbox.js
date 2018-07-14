import React, {Component} from 'react'
import TextFieldGroup from "../../../shared/TextFieldsGroup"
import {signin} from "../../../shared/queries"
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {dbPromise} from '../indexDB'
import {Consumer, Query} from "graphql-react"
import {isEmpty} from "lodash"
import bcrypt from 'bcryptjs-then'
import validator from '../../../../node_modules/validator/index.js'
import classnames from "classnames"
import Menu from '../Menu'
import PropTypes from "prop-types"
class Inbox extends Component {
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
                <div className="row">
                    <div className="col-sm-2 col-md-2 bd-sidebar">
                        <Menu router={this.context.router} active="inbox"/>

                    </div>
                    <div className="col-sm-7 col-md-7 col-xl-7 bd-content">
                        <h2>Inbox for various notifications</h2>

                    </div>
                </div>
            </div>
        )

    }
}

Inbox.contextTypes={
    router:PropTypes.object.isRequired
}
export default Inbox

