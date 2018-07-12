import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./components/App"
import Home from "./components/Home"
import Dashboard from "./components/admin/Dashboard"
import requireAuth from "./components/utils/requireAuth"


export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={requireAuth(Dashboard)}/>
                        <Route exact path="/guards" component={Home}/>
                    </Switch>
                </App>
            </div>
        </BrowserRouter>
    )
}