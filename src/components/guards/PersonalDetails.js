import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import validator from 'validator'
import {isEmpty} from 'lodash'

class PersonalDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee_id: '',
            surname: '',
            first_name: '',
            last_name: '',
            dob: '',
            gender: '',
            nationalID: '',
            employment_date: '',
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }


    validateInput(data) {
        let errors = {}
        if (!data.employee_id) {
            errors.employee_id = 'This field is required'
        }

        if (validator.isEmpty(data.first_name)) {
            errors.first_name = 'This field is required'
        }
        if (validator.isEmpty(data.last_name)) {
            errors.last_name = 'This field is required'
        }
        if (validator.isEmpty(data.gender)) {
            errors.gender = 'This field is required'
        }

        if (validator.isEmpty(data.dob)) {
            errors.dob = 'This field is required'
        }
        if (validator.isEmpty(data.nationalID)) {
            errors.dob = 'This field is required'
        }
        if (Date.parse(data.dob) > Date.parse(new Date('2000'))) {
            errors.dob = "A teacher must be 18 and above"
        }
        if (validator.isEmpty(data.employment_date)) {
            errors.employment_date = 'This field is required'
        }
        if (Date.parse(data.dob) > Date.parse(data.employment_date)) {
            errors.employment_date = 'You cannot be employed before you are born'
        }
        if (Date.parse(data.employment_date) < Date.parse(new Date('1976'))) {
            errors.dob = 'You should be retired by now'
        }
        if (Date.parse(data.dob) < Date.parse(new Date('1956'))) {
            errors.dob = 'You should be retired by now'
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
        if (this.isValid() || !this.state.invalid) {
            this.setState({errors: {}, isLoading: true})
            this.props.registerGuard(this.state).then(
                (teacher) => {
                    this.props.onClose()
                    this.props.addGuard(teacher.data)
                    this.setState({
                        employee_id: '',
                        surname: '',
                        first_name: '',
                        last_name: '',
                        dob: '',
                        gender: '',
                        nationalID: '',
                        employment_date: '',
                        errors: {},
                        isLoading: false,
                        invalid: false
                    })
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, isLoading, invalid, employee_id, surname, first_name, last_name, dob, gender, nationalID, employment_date} = this.state
        const err = () => {
            for (let prop in errors) {
                if (errors.hasOwnProperty(prop)) {
                    return (<div className="alert alert-danger" role="alert">
                        {errors[prop]}
                    </div>)
                }

            }
        }
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Personal details</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Guard ID"
                                type="text"
                                name="employee_id"
                                value={employee_id}
                                onChange={this.onChange}
                                error={errors.employee_id}
                                disabled={true}

                            />

                            <TextFieldGroup
                                label="Surname"
                                type="text"
                                name="surname"
                                value={surname}
                                onChange={this.onChange}
                                error={errors.surname}
                                disabled={true}

                            />
                            <TextFieldGroup
                                label="First name"
                                type="text"
                                name="first_name"
                                value={first_name}
                                onChange={this.onChange}
                                error={errors.first_name}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Last name"
                                type="text"
                                name="last_name"
                                value={last_name}
                                onChange={this.onChange}
                                error={errors.last_name}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Date of birth"
                                type="text"
                                name="dob"
                                value={new Date(dob).toDateString()}
                                onChange={this.onChange}
                                error={errors.dob}
                                disabled={true}
                            />

                            <TextFieldGroup
                                label="National ID"
                                type="number"
                                name="nationalID"
                                value={nationalID}
                                onChange={this.onChange}
                                error={errors.nationalID}
                                disabled={true}

                            />

                            <TextFieldGroup
                                label="Date of Employment"
                                type="text"
                                name="employment_date"
                                value={new Date(employment_date).toDateString()}
                                onChange={this.onChange}
                                error={errors.employment_date}
                                disabled={true}
                            />
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" htmlFor="gender">Gender</label>
                                <div className="col-sm-10">
                                    <select className="form-control form-control-sm" id="gender" name="gender"
                                            required="true" onChange={this.onChange} value={gender}>
                                        <option>Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-4 offset-sm-4">
                                    <button disabled={isLoading || invalid} className="btn btn-dark btn-sm form-control"
                                            onClick={this.props.showContactAndPaymentDetailsModal}>Next
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


PersonalDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    showContactAndPaymentDetailsModal: PropTypes.func.isRequired,
    closeContactAndPaymentDetailsModal: PropTypes.func.isRequired,


}
PersonalDetails.contextTypes = {
    router: PropTypes.object.isRequired

}

export default PersonalDetails