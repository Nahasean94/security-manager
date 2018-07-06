import React from 'react'
import PersonalDetails from "../guards/PersonalDetails"
import ContactAndPaymentDetails from "../guards/ContactAndPaymentDetails"
import PaymentDetails from "../guards/PaymentDetails"
import NewLocationForm from "../locations/NewLocationForm"
import {Consumer} from "graphql-react"

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPersonalDetailsModal: false,
            showContactAndPaymentDetailsModal: false,
            showPaymentDetailsModal: false,
            showNewLocationFormModal: false,
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
    }

    showPersonalDetailsModal(e) {
        e.preventDefault()
        this.setState({showPersonalDetailsModal: true})
    }

    closePersonalDetailsModal() {
        this.setState({showPersonalDetailsModal: false})
    }

    showContactAndPaymentDetailsModal(e) {
        e.preventDefault()
        this.setState({showContactAndPaymentDetailsModal: true})
        this.closePersonalDetailsModal()
    }

    closeContactAndPaymentDetailsModal() {
        this.setState({showContactAndPaymentDetailsModal: false})
    }

    showPaymentDetailsModal(e) {
        e.preventDefault()
        this.setState({showPaymentDetailsModal: true})
        this.closeContactAndPaymentDetailsModal()
    }

    closePaymentDetailsModal() {
        this.setState({showPaymentDetailsModal: false})
    }

    showNewLocationFormModal(e) {
        e.preventDefault()
        this.setState({showNewLocationFormModal: true})

    }

    closeNewLocationFormModal() {
        this.setState({showNewLocationFormModal: false})
    }

    render() {
        const {showPersonalDetailsModal, showContactAndPaymentDetailsModal, showPaymentDetailsModal,showNewLocationFormModal} = this.state

        return (
            <div>
                <button className="btn btn-sm btn-secondary" onClick={this.showPersonalDetailsModal}>new guard</button>
                <br/>
                <br/>
                <button className="btn btn-sm btn-secondary" onClick={this.showNewLocationFormModal}>new location</button>
                <PersonalDetails show={showPersonalDetailsModal} onClose={this.closePersonalDetailsModal}
                                 showContactAndPaymentDetailsModal={this.showContactAndPaymentDetailsModal}
                                 closeContactAndPaymentDetailsModal={this.closeContactAndPaymentDetailsModal}/>
                <ContactAndPaymentDetails show={showContactAndPaymentDetailsModal}
                                          onClose={this.closeContactAndPaymentDetailsModal}
                                          showPaymentDetailsModal={this.showPaymentDetailsModal}
                                          closePaymentDetailsModal={this.closePaymentDetailsModal}/>
                <PaymentDetails show={showPaymentDetailsModal}
                                onClose={this.closePaymentDetailsModal}/>
                <Consumer>{graphql => <NewLocationForm graphql={graphql} show={showNewLocationFormModal}
                                                       onClose={this.closeNewLocationFormModal}/>}</Consumer>
            </div>
        )
    }
}

export default Dashboard