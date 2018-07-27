import React from 'react'
import Menu from "../../admin/Menu"
import PropTypes from 'prop-types'
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {Consumer, Query} from "graphql-react"
import {getAllSalaries} from "../../../shared/queries"
import SalaryView from "./SalaryView"
import NewSalaryBracket from "./NewSalaryBracket"
import SalaryDetails from "./SalaryDetails"


class SalaryTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           transaction: '',
            salary:'',
            showNewSalaryBracketModal:false
        }
        this.onSelectSalary = this.onSelectSalary.bind(this)
        this.showNewSalaryBracketModal = this.showNewSalaryBracketModal.bind(this)
        this.closeNewSalaryBracketModal = this.closeNewSalaryBracketModal.bind(this)

    }
    showNewSalaryBracketModal(e){
        e.preventDefault()
        this.setState({showNewSalaryBracketModal:true})
    }
    closeNewSalaryBracketModal(){
        this.setState({showNewSalaryBracketModal:false})
    }


    onSelectSalary(transaction,salary) {
        this.setState({transaction,salary})

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 col-md-2 bd-sidebar">
                        <Menu router={this.context.router} active="salaries"/>
                    </div>
                    <div className="col-sm-5 col-md-5 col-xl-5 bd-content">
                        <button className="btn btn-sm btn-dark" onClick={this.showNewSalaryBracketModal}>New salary bracket</button>
                        <br/>
                        <br/>
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fetchOptionsOverride}
                            // variables={{id: CurrentSalary.getSalaryId()}}
                            query={getAllSalaries}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.getAllSalaries && data.getAllSalaries.length > 0) {
                                        return (
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Guard Id</th>
                                                    <th scope="col">Amount (KES)</th>
                                                    <th scope="col">Contract</th>
                                                    <th scope="col">Date</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {data.getAllSalaries.map(salary => {
                                                    return <SalaryView salary={salary}
                                                                       onSelectSalary={this.onSelectSalary}/>

                                                })}
                                                </tbody>
                                            </table>)
                                    } else {
                                        return <p>No payments found</p>
                                    }
                                }
                                else if (loading) {
                                    return <p>Loading…</p>
                                }
                                return <p>Loading failed.</p>
                            }
                            }
                        </Query>
                    </div>
                    <div className="col-sm-5 col-md-5 col-xl-5 bd-salary">
                        <div className="row">
                            <div className="offset-sm-1">
                                <br/>
                                <SalaryDetails transaction={this.state.transaction} salary={this.state.salary}/></div>
                        </div>

                    </div>
                </div>
                <Consumer>{graphql=><NewSalaryBracket graphql={graphql} show={this.state.showNewSalaryBracketModal} onClose={this.closeNewSalaryBracketModal}/>}</Consumer>
            </div>
        )
    }
}

SalaryTable.contextTypes = {
    router: PropTypes.object.isRequired
}
export default SalaryTable
