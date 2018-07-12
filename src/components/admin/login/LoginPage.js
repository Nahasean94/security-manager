import React from 'react'
import LoginForm from './LoginForm'
import {Consumer} from 'graphql-react'

class LoginPage extends React.Component {

    render() {
        return (

                <div >

                    <Consumer >{graphql =>   <LoginForm  graphql={graphql} onClose={this.props.onClose}/>}</Consumer>
                </div>

        )
    }
}

export default LoginPage