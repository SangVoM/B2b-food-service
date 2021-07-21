import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { homePage } from '../Pages/store/reducer'
import { order } from '../Pages/Cart/store/reducer'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
    homePage: homePage.reducer,
    order: order.reducer,
    router: connectRouter(history),
})

export default rootReducer
