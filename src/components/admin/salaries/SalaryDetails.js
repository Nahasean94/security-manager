import React from 'react'

class SalaryDetails extends React.Component {
    render() {
        const {transaction,salary} = this.props
        if (transaction && salary) {
            let total_deductions=0
            return  <div>
                <table className="table table-borderless">
                    <tbody>
                    <tr>
                        <th scope="row">Gross salary:</th>
                        <td>{transaction.amount}</td>
                    </tr>
                    <tr>
                        <th scope="row">Payment contract
                        </th>
                        <td>{salary.contract}</td>
                    </tr>
                    <tr>
                        <th scope="row">Deductions
                        </th>
                        {salary.deductions.length && salary.deductions.map(deduction => {
                            total_deductions=total_deductions+deduction.amount
                            return (
                                <tr>
                                    <th scope="row">{deduction.name.toLocaleUpperCase()}
                                    </th>
                                    <td>{deduction.amount}</td>
                                </tr>
                            )
                        })}
                        <hr/>
                        <tr>
                            <th scope="row">Total deductions
                            </th>
                            <td>{total_deductions}</td>
                        </tr>
                    </tr>
                    <tr>
                        <th scope="row">Net Salary
                        </th>
                        <td>{transaction.amount-total_deductions}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        }
        return <p>Select an item to read</p>
    }
}

export default SalaryDetails