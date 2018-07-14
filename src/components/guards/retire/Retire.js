import React from 'react'
import {Consumer} from "graphql-react"
import ApplyForRetire from "./ApplyForRetire"


class Retire extends React.Component {

    render() {

        return (
            <div>
                <Consumer>{graphql =>   <ApplyForRetire   graphql={graphql}/>}</Consumer>
            </div>
        )
    }
}

export default Retire