import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isDate, isEmpty} from 'lodash'

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

import Select from 'react-select'
import {Query} from "graphql-react"
import TextFieldGroup from "../../shared/TextFieldsGroup"

let hostOptions, tagOptions

class TestModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            title: '',
            description: '',
            podcast: '',
            coverImage: '',
            paid: false,
            message:'',
            errors: {},
            isLoading: false,
            invalid: false,
            tags: [],
            hosts: [],

        }

        this.onChange = this.onChange.bind(this)
        this.onSubmitBasicInfo = this.onSubmitBasicInfo.bind(this)
        this.onSubmitCoverImage = this.onSubmitCoverImage.bind(this)
        this.onSubmitAudioFile = this.onSubmitAudioFile.bind(this)
        this.handlePodcastChange = this.handlePodcastChange.bind(this)
        this.handleCoverImageChange = this.handleCoverImageChange.bind(this)
        this.handleTagsChange = this.handleTagsChange.bind(this)
        this.handleHostsChange = this.handleHostsChange.bind(this)

    }

    handleTagsChange = (tags) => {
        this.setState({tags})
    }
    handleHostsChange = (hosts) => {
        this.setState({hosts})
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.title)) {
            errors.title = 'This field is required'
        }
        if (data.title.length < 3) {
            errors.title = 'Description must be more than 3 charaters'
        }
        if (validator.isEmpty(data.description)) {
            errors.description = 'This field is required'
        }
        if (data.tags.length < 1) {
            errors.tags = 'This field is required'
        }
        if (data.hosts.length < 1) {
            errors.hosts = 'This field is required'
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

    onSubmitBasicInfo(e) {
        e.preventDefault()
        let {hosts, tags} = this.state
        hosts = hosts.map(host => {
            return host.value
        })
        tags = tags.map(tag => {
            return tag.value
        })
        if (this.isValid()) {


        }
    }
    handlePodcastChange({
                            target: {
                                validity,
                                files: [file]
                            }
                        }) {
        if (validity.valid) {
            this.setState({podcast: file})
        }
    }

    handleCoverImageChange({
                               target: {
                                   validity,
                                   files: [file]
                               }
                           }) {
        if (validity.valid) {
            this.setState({coverImage: file})
        }
    }
    onSubmitCoverImage(e) {
        e.preventDefault()
        if (this.state.coverImage) {

        }
    }

    onSubmitAudioFile(e) {
        e.preventDefault()
        if (this.state.podcast) {

        }
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, isLoading, invalid, description, title, paid, tags,message} = this.state
        let {hosts} = this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Create new podcast</ModalHeader>
                    <ModalBody>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home"
                                   role="tab" aria-controls="pills-home" aria-selected="true">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile"
                                   role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact"
                                   role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                 aria-labelledby="pills-home-tab">...
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                                 aria-labelledby="pills-profile-tab">...
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel"
                                 aria-labelledby="pills-contact-tab">...
                            </div>
                        </div>
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


TestModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
TestModal.contextTypes = {
    router: PropTypes.object.isRequired
}

export default TestModal

