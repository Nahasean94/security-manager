import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./components/App"
import Home from "./components/Home"
import requireAuth from "./components/utils/requireAuth"
import AdminInboxPage from "./components/admin/inbox/InboxPage"
import InboxPage from "./components/guards/inbox/InboxPage"
import ProfilePage from "./components/guards/profile/ProfilePage"
import Reports from "./components/guards/reports/Reports"
import Leave from "./components/guards/leave/Leave"
import AttendanceTable from "./components/guards/attendance/AttendanceTable"
import AllGuardsAttendanceTable from "./components/admin/attendance/AttendanceTable"
import AllGuards from "./components/admin/guards/AllGuards"
import AllLocations from "./components/admin/locations/AllLocations"
import SalaryTable from "./components/admin/salaries/SalaryTable"


export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={requireAuth(AdminInboxPage)}/>
                        <Route exact path="/admin/locations" component={requireAuth(AllLocations)}/>
                        <Route exact path="/admin/guards" component={requireAuth(AllGuards)}/>
                        <Route exact path="/admin/attendance" component={requireAuth(AllGuardsAttendanceTable)}/>
                        <Route exact path="/admin/salaries" component={requireAuth(SalaryTable)}/>
                        <Route exact path="/guards" component={Home}/>
                        <Route exact path="/guards/leave" component={Leave}/>
                        <Route exact path="/guards/inbox" component={InboxPage}/>
                        <Route exact path="/guards/profile" component={ProfilePage}/>
                        <Route exact path="/guards/reports" component={Reports}/>
                        <Route exact path="/guards/attendance" component={AttendanceTable}/>
                    </Switch>
                </App>
            </div>
        </BrowserRouter>
    )
}