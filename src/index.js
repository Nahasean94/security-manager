import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import {GraphQL, Provider as GraphQLReact,} from 'graphql-react'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import {Provider} from 'react-redux'
import {setCurrentUser} from './actions/loginActions'
import jwt from 'jsonwebtoken'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))


if (localStorage.getItem('Fundcast')) {
    store.dispatch(setCurrentUser(jwt.decode(localStorage.getItem('Fundcast'))))
}


const graphql = new GraphQL()

ReactDOM.render(
    <Provider store={store}>
        <GraphQLReact value={graphql}>
            <Routes/>
        </GraphQLReact>
    </Provider>
    , document.getElementById('root'))

registerServiceWorker()