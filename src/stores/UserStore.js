// redux stuff
import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk';
import logger from 'redux-logger'

import promiseMiddleware from 'redux-promise-action-middleware'

const initialState = { isLoading : false, user: {}, hasError: false }

function userReducer(state = initialState, action) {
    switch(action.type){
        case 'FETCH_USER_LOADING':
            return Object.assign({}, state, { isLoading: true })
        case 'FETCH_USER_SUCCESS':
            const user = action.data.results[0]
            return Object.assign({}, state, { isLoading: false, user, hasError: false })
        case 'FETCH_USER_FAILURE':
            return Object.assign({}, state, { isLoading: false, hasError: true })
        default:
            return state
    }
}

const userStore = createStore(userReducer, applyMiddleware(thunk,promiseMiddleware,logger));

export default userStore