import { homePage } from './reducer'
import { AUTH_ENDPOINT, COMMON_ENDPOINT } from '../../constants/endpoint'
import axiosInstance from '../../api/axiosInstance'
import { message } from 'antd'
import { sleep } from '../../utils/helper'
import { AUTH_KEY } from '../../constants/localStorage'

const { listCategory, startProcess, onErrored, endProcess, listUser, listProduct, getUserInfo } = homePage.actions

export const getListUser = (payload) => async (dispatch, getState) => {
    try {
        dispatch(startProcess())
        const listUserResponse = await new axiosInstance.get(
            AUTH_ENDPOINT.LIST_USER,
            payload
        )
        const { data } = listUserResponse.data
        dispatch(listUser(data))
    } catch (err) {
        dispatch(onErrored(err))
    } finally {
        await new sleep(1000)
        dispatch(endProcess())
    }
}

export const loginUser = (payload) => async (dispatch, getState) => {
    try {
        dispatch(startProcess())
        const userLoginResponse = await new axiosInstance.post(
            AUTH_ENDPOINT.LOGIN,
            payload
        )
        localStorage.setItem(
            AUTH_KEY.USER_LOGIN,
            JSON.stringify(userLoginResponse?.data.data)
        )
        message.success('Login success!')
        dispatch(getUserInfo(userLoginResponse?.data.data))
    } catch (err) {
        message.error(err?.response?.data?.error || 'login failed')
        dispatch(onErrored(err))
    } finally {
        await new sleep(1000)
        dispatch(endProcess())
    }
}

export const getListCategory = (payload) => async (dispatch, getState) => {
    try {
        dispatch(startProcess())
        const listCategoryResponse = await new axiosInstance.get(
            COMMON_ENDPOINT.LIST_CATEGORY,
            payload
        )
        const { data } = listCategoryResponse.data
        dispatch(listCategory(data))
    } catch (err) {
        dispatch(onErrored(err))
    } finally {
        await new sleep(1000)
        dispatch(endProcess())
    }
}

export const getListProduct = (payload) => async (dispatch, getState) => {
    try {
        dispatch(startProcess())
        const query = { page: 1, limit: 10, category_id: payload?.category_id ? (
                payload?.category_id === 'all' ? '' : payload?.category_id
            ) : '' }
        const listProductResponse = await new axiosInstance.get(
            COMMON_ENDPOINT.LIST_PRODUCT( query.page, query.limit, query.category_id )
        )
        const { data } = listProductResponse.data
        dispatch(listProduct(data))
    } catch (err) {
        dispatch(onErrored(err))
    } finally {
        await new sleep(1000)
        dispatch(endProcess())
    }
}
