import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import validator from 'validator'
import {isEmpty} from 'lodash'
import {fetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {locations} from "../../shared/queries"
import {Query} from "graphql-react"
import Select from 'react-select'


let locationOptions
class ContactAndLocationDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            cellphone: '',
            postal_address: '',
            location: '',
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.onChange = this.onChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    handleLocationChange = (location) => {
        this.setState({location})
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.postal_address)) {
            errors.postal_address = 'This field is required'
        }
        if (validator.isEmpty(data.cellphone)) {
            errors.last_name = 'This field is required'
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
                        email: '',
                        cellphone: '',
                        postal_address: '',
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

        const {errors, isLoading, invalid, email, cellphone, postal_address,} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Contact details</ModalHeader>
                    <ModalBody>

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


ContactAndLocationDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    showPaymentDetailsModal: PropTypes.func.isRequired,
    closePaymentDetailsModal: PropTypes.func.isRequired,

}
// ContactAndLocationDetails.contextTypes = {
//     router: PropTypes.object.isRequired
//
// }

export default ContactAndLocationDetails