import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./components/App"
import Home from "./components/Home"
import Dashboard from "./components/admin/Dashboard"
import requireAuth from "./components/utils/requireAuth"
import ApplyForLeave from "./components/guards/ApplyForLeave"
import Inbox from "./components/guards/Inbox"
import ApplyForRetire from "./components/guards/ApplyForRetire"
import Profile from "./components/guards/Profile"
import Reports from "./components/guards/Reports"


export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={requireAuth(Dashboard)}/>
                        <Route exact path="/guards" component={Home}/>
                        <Route exact path="/guards/leave" component={ApplyForLeave}/>
                        <Route exact path="/guards/retire" component={ApplyForRetire}/>
                        <Route exact path="/guards/inbox" component={Inbox}/>
                        <Route exact path="/guards/profile" component={Profile}/>
                        <Route exact path="/guards/reports" component={Reports}/>
                    </Switch>
                </App>
            </div>
        </BrowserRouter>
    )
}