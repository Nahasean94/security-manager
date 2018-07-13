import React from 'react'
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap"
import {Consumer} from "graphql-react"
import TextFieldGroup from "../../../shared/TextFieldsGroup"

class GuardModal extends React.Component {
    constructor(props){
        super(props)
        this.state={
            display:'authorize',
            errors: {},
            dropdownOpen: false
        }
        this.toggle = this.toggle.bind(this);
        this.changeDisplayToAuthorize=this.changeDisplayToAuthorize.bind(this)
        this.changeDisplayToInbox=this.changeDisplayToInbox.bind(this)
        this.changeDisplayToLeave=this.changeDisplayToLeave.bind(this)
        this.changeDisplayToRetire=this.changeDisplayToRetire.bind(this)
        this.onSignout=this.onSignout.bind(this)
    }
    changeDisplayToAuthorize(e){
        e.preventDefault()
        this.setState({display:'authorize'})
    }
    changeDisplayToInbox(e){
        e.preventDefault()
        this.setState({display:'inbox'})
    }
    changeDisplayToLeave(e){
        e.preventDefault()
        this.setState({display:'leave'})
    }
    changeDisplayToRetire(e){
        e.preventDefault()
        this.setState({display:'retire'})
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    onSignout(e){
        e.preventDefault()
    }

    render() {
        const {show, onClose} = this.props
        const {errors,display} = this.state
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Guard Actions</ModalHeader>
                    <ModalBody>
                        {display==='authorize' && <form onSubmit={this.onSignout}>
                            <TextFieldGroup
                                label="Guard ID"
                                type="number"
                                name="guard_id"
                                value={this.state.guard_id}
                                onChange={this.onChange}
                                error={errors.guard_id}
                            />
                            <TextFieldGroup
                                label="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <div className="form-group row">
                                <div className="col-sm-3 offset-sm-3">
                                    <input type="submit" value="Sign in"
                                           className="form-control btn btn-secondary btn-sm "/>
                                </div>
                                <Dropdown group direction="right" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        More actions
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem >View inbox</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>Apply for leave</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>Apply for retirement</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>

                        </form>}
                        {display==='leave' && <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Guard ID"
                                type="number"
                                name="guard_id"
                                value={this.state.guard_id}
                                onChange={this.onChange}
                                error={errors.guard_id}
                            />
                            <TextFieldGroup
                                label="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <div className="form-group row">
                                <div className="col-sm-3 offset-sm-3">
                                    <input type="submit" value="Sign in"
                                           className="form-control btn btn-secondary btn-sm "/>
                                </div>
                                <Dropdown group direction="right" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        More actions
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem >View inbox</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>Apply for leave</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>Apply for retirement</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>

                        </form>}
                        {display==='inbox' && <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Guard ID"
                                type="number"
                                name="guard_id"
                                value={this.state.guard_id}
                                onChange={this.onChange}
                                error={errors.guard_id}
                            />
                            <TextFieldGroup
                                label="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <div className="form-group row">
                                <div className="col-sm-3 offset-sm-3">
                                    <input type="submit" value="Sign in"
                                           className="form-control btn btn-secondary btn-sm "/>
                                </div>
                                <Dropdown group direction="right" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        More actions
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem >View inbox</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>Apply for leave</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>Apply for retirement</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>

                        </form>}
                        {display==='retire' && <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Guard ID"
                                type="number"
                                name="guard_id"
                                value={this.state.guard_id}
                                onChange={this.onChange}
                                error={errors.guard_id}
                            />
                            <TextFieldGroup
                                label="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <div className="form-group row">
                                <div className="col-sm-3 offset-sm-3">
                                    <input type="submit" value="Sign in"
                                           className="form-control btn btn-secondary btn-sm "/>
                                </div>
                                <Dropdown group direction="right" isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        More actions
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem >View inbox</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>Apply for leave</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>Apply for retirement</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>

                        </form>}
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

export default GuardModal