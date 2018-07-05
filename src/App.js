import React, {Component} from 'react'
import TextFieldGroup from "./shared/TextFieldsGroup"
import NavigationBar from "./components/NavigationBar"


const {ipcRenderer} = window.require('electron')


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            password: '',
            guards: []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        ipcRenderer.send('get-guard', {id: this.state.id, password: this.state.password})
        ipcRenderer.on('got-guard', (event,guard) => {
            if (guard) {
                this.setState({guards: [...this.state.guards, guard.first_name+" "+guard.last_name]})
                ipcRenderer.send('sign-in',{guard:guard,time:new Date()})
            }
        })
        this.setState({id: '', password: ''})
    }


    render() {
        const {guards} = this.state
        return (
            <div>
                <NavigationBar/>
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="col-2 col-md-2 bd-sidebar">
                        <h3>Signed in</h3>
                        <ul className="list-unstyled">
                            {guards.map(guard => {
                                return <li className=""><strong className="names">{guard}</strong>
                                    <div className="feed-meta">
                                        <ul className="list-inline">
                                            <li className="list-inline-item ">ere</li>
                                            <li className="list-inline-item ">ere</li>
                                        </ul>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="col-4 col-md-4 col-xl-4 offset-2 bd-content">
                        <div className="container-fluid">
                            <div className="sign-in-form">
                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        label="ID"
                                        type="text"
                                        name="id"
                                        value={this.state.id}
                                        onChange={this.onChange}
                                    />
                                    <TextFieldGroup
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    <div className="form-group">
                                        <input type="submit" value="Sign in"
                                               className="form-control btn btn-secondary btn-sm "/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>)

    }
}


export default App

