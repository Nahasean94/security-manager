import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./components/App"
import Home from "./components/Home"
import Dashboard from "./components/admin/Dashboard"
import requireAuth from "./components/utils/requireAuth"
import InboxPage from "./components/guards/inbox/InboxPage"
import Retire from "./components/guards/retire/Retire"
import ProfilePage from "./components/guards/profile/ProfilePage"
import Reports from "./components/guards/reports/Reports"
import Leave from "./components/guards/leave/Leave"


export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={requireAuth(Dashboard)}/>
                        <Route exact path="/guards" component={Home}/>
                        <Route exact path="/guards/leave" component={Leave}/>
                        <Route exact path="/guards/retire" component={Retire}/>
                        <Route exact path="/guards/inbox" component={InboxPage}/>
                        <Route exact path="/guards/profile" component={ProfilePage}/>
                        <Route exact path="/guards/reports" component={Reports}/>
                    </Switch>
                </App>
            </div>
        </BrowserRouter>
    )
}