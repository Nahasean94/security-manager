import React from 'react'
import PersonalDetails from "../guards/PersonalDetails"
import ContactAndLocationDetails from "../guards/ContactAndLocationDetails"
import PaymentDetails from "../guards/PaymentDetails"
import NewLocationForm from "../locations/NewLocationForm"
import {Consumer} from "graphql-react"
import TestModal from "../guards/Test"

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPersonalDetailsModal: false,
            showContactAndPaymentDetailsModal: false,
            showPaymentDetailsModal: false,
            showNewLocationFormModal: false,
            showTestModal: false,
        }
        this.showPersonalDetailsModal = this.showPersonalDetailsModal.bind(this)
        this.closePersonalDetailsModal = this.closePersonalDetailsModal.bind(this)
        this.showContactAndPaymentDetailsModal = this.showContactAndPaymentDetailsModal.bind(this)
        this.showContactAndPaymentDetailsModal = this.showContactAndPaymentDetailsModal.bind(this)
        this.closeContactAndPaymentDetailsModal = this.closeContactAndPaymentDetailsModal.bind(this)
        this.showPaymentDetailsModal = this.showPaymentDetailsModal.bind(this)
        this.closePaymentDetailsModal = this.closePaymentDetailsModal.bind(this)
        this.showNewLocationFormModal = this.showNewLocationFormModal.bind(this)
        this.closeNewLocationFormModal = this.closeNewLocationFormModal.bind(this)
        this.showTestModal = this.showTestModal.bind(this)
        this.closeTestModal = this.closeTestModal.bind(this)
    }

    showPersonalDetailsModal() {

        this.setState({showPersonalDetailsModal: true})
    }

    closePersonalDetailsModal() {
        this.setState({showPersonalDetailsModal: false})
    }

    showContactAndPaymentDetailsModal() {

        this.setState({showContactAndPaymentDetailsModal: true})
        this.closePersonalDetailsModal()
    }

    closeContactAndPaymentDetailsModal() {
        this.setState({showContactAndPaymentDetailsModal: false})
    }

    showPaymentDetailsModal() {

        this.setState({showPaymentDetailsModal: true})
        this.closeContactAndPaymentDetailsModal()
    }

    closePaymentDetailsModal() {
        this.setState({showPaymentDetailsModal: false})
    }

    showNewLocationFormModal() {
        this.setState({showNewLocationFormModal: true})
    }

    closeNewLocationFormModal() {
        this.setState({showNewLocationFormModal: false})
    }
    showTestModal() {
        this.setState({showTestModal: true})
    }

    closeTestModal() {
        this.setState({showTestModal: false})
    }

    render() {
        const {showPersonalDetailsModal, showContactAndPaymentDetailsModal, showPaymentDetailsModal, showNewLocationFormModal, showTestModal} = this.state

        return (
            <div>
                <button className="btn btn-sm btn-secondary" onClick={this.showPersonalDetailsModal}>new guard</button>
                <br/>
                <br/>
                <button className="btn btn-sm btn-secondary" onClick={this.showNewLocationFormModal}>new location
                </button>
                <br/>
                <br/>
                <button className="btn btn-sm btn-secondary" onClick={this.showTestModal}>test
                </button>
                <Consumer>{graphql => <PersonalDetails graphql={graphql} show={showPersonalDetailsModal}
                                                       onClose={this.closeTestModal}
                                                       showContactAndPaymentDetailsModal={this.showContactAndPaymentDetailsModal}
                                                       closeContactAndPaymentDetailsModal={this.closeContactAndPaymentDetailsModal}/>}</Consumer>
                <Consumer>{graphql => <NewLocationForm graphql={graphql} show={showNewLocationFormModal}
                                                       onClose={this.closeNewLocationFormModal}/>}</Consumer>
                <Consumer>{graphql => <TestModal graphql={graphql} show={showTestModal}
                                                       onClose={this.closeTestModal}/>}</Consumer>
            </div>
        )
    }
}

export default Dashboard