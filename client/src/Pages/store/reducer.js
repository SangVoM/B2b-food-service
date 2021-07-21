import { createSlice } from '@reduxjs/toolkit'
import { AUTH_KEY } from '../../constants/localStorage';

const initialState = {
    listCategory: [],
    userInfo: JSON.parse(localStorage.getItem(AUTH_KEY.USER_LOGIN) || null),
    loading: false,
    error: null,
    listUser: [],
    listProduct: [],
    page: 1,
    limit: 10,
    category_id: null
}

export const homePage = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        startProcess(state) {
            state.loading = true
        },
        listUser(state, action) {
            state.listUser = action.payload
        },
        getUserInfo(state, action) {
            state.userInfo = action.payload
        },
        listCategory(state, action) {
            state.listCategory = action.payload
        },
        listProduct(state, action) {
            state.listProduct = action.payload
        },
        onErrored(state, action) {
            state.error = action.payload
        },
        endProcess(state) {
            state.loading = false
        },
    },
})
