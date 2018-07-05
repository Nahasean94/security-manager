import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./components/App"
import Home from "./components/Home"


export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </App>
            </div>
        </BrowserRouter>
    )
}