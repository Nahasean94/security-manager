import React from 'react'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../../../shared/TextFieldsGroup'
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {addSalaryBracket, isSalaryBracketExists} from "../../../shared/queries"
import PropTypes from "prop-types"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"


class NewSalaryBracket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: '',
            contract: '',
            errors: {},
            isLoading: false,
            invalid: false,
            loading: false,
            message: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkSalaryBracketExitsExists = this.checkSalaryBracketExitsExists.bind(this)
    }

    checkSalaryBracketExitsExists() {
        this.props.graphql
            .query({
                fetchOptionsOverride: fetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    variables: {
                        amount: this.state.amount,
                        contract: this.state.contract,
                    },
                    query: isSalaryBracketExists
                }
            })
            .request.then(({data}) => {

            if (data) {
                if (data.isSalaryBracketExists.exists) {
                    let errors = {}
                    errors.amount = 'A salary bracket with such details already exists'
                    this.setState({errors, invalid: true,})
                } else {
                    let errors = {}
                    this.setState({errors, invalid: false,})
                }
            }
        })

    }


    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.contract)) {
            errors.contract = 'This field is required'
        }

        if (!data.amount) {
            errors.amount = 'This field is required'
        }
        if (data.amount<0) {
            errors.amount = 'Amount cannot be negative'
        }


        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            amount: this.state.amount,
                            contract: this.state.contract,
                        },
                        query: addSalaryBracket
                    }
                })
                .request.then(({data}) => {

                    if (data) {
                        this.setState({
                            amount: '',
                            contract: '',
                            errors: {},
                            isLoading: false,
                            invalid: false,
                            loading: false,
                            message: data.addSalaryBracket
                                ? <div className="alert alert-success" role="alert">Successfully added salary bracket
                                </div>
                                : <div className="alert alert-danger" role="alert">An error occurred while adding salary bracket
                                </div>
                        })
                    }
                }
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, loading, message, isLoading, invalid, amount, contract} = this.state
        if (loading) {
            return <p>Adding a new salary bracket</p>
        }

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg" className="modal-dialog modal-dialog-centered">
                    <ModalHeader toggle={onClose}>Add a new salary bracket</ModalHeader>
                    <ModalBody>
                        {message ? <div>
                            {message}
                        </div> : ""}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group row">
                                <div className="col-sm-3">
                                    <label htmlFor="contract">Contract</label>
                                </div>
                                <div className="col-sm-9">
                                    <select className="form-control form-control-sm" id="contract" name="contract"
                                            required="true" onChange={this.onChange} value={contract}>
                                        <option>Select</option>
                                        <option value="month">Monthly</option>
                                        <option value="week">Weekly</option>
                                        <option value="day">Daily</option>
                                    </select>
                                </div>
                            </div>

                            <TextFieldGroup
                                label="Amount"
                                type="number"
                                name="amount"
                                value={amount} autoFocus={true}
                                onChange={this.onChange}
                                error={errors.amount}
                                checkLocationExists={this.checkSalaryBracketExitsExists}
                            />
                            <div className="form-group row">
                                <div className="col-sm-4 offset-sm-4">
                                    <button disabled={isLoading || invalid} className="btn btn-dark btn-sm form-control"
                                            type="submit">Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }

}

NewSalaryBracket.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
export default NewSalaryBracket