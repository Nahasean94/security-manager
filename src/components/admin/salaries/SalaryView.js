import React from 'react'

class SalaryView extends React.Component {
    render() {
        const {guard_id, contract, transactions} = this.props.salary
        if (transactions.length > 0) {
            return (
                transactions.map(transaction => {
                  return <tr>
                        <td><a href=""  onClick={(e)=>{
                            e.preventDefault()
                            this.props.onSelectSalary(transaction,this.props.salary)
                        }}>{guard_id}</a></td>
                        <td>{transaction.amount}</td>
                        <td>{contract}</td>
                        <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                    </tr>
                })
            )
        }
        return null
    }
}


export default SalaryView