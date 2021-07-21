import { order } from './reducer'
import { COMMON_ENDPOINT} from '../../../constants/endpoint'
import axiosInstance from '../../../api/axiosInstance'
import { sleep } from '../../../utils/helper'
import { message } from 'antd';

const { startProcess, onErrored, endProcess, addCard, removeItemOfCard, removeCard } = order.actions

export const addCartAction = (payload) => async (dispatch, getState) => {
    try {
        dispatch(startProcess())
        dispatch(addCard(payload))
    } catch (err) {
        dispatch(onErrored(err))
    } finally {
        await new sleep(1000)
        dispatch(endProcess())
    }
}

export const removeItemCartAction = (payload) => async (dispatch, getState) => {
    try {
        dispatch(startProcess())
        dispatch(removeItemOfCard(payload))
    } catch (err) {
        dispatch(onErrored(err))
    } finally {
        await new sleep(1000)
        dispatch(endProcess())
    }
}

export const removeCardAction = () => async (dispatch, getState) => {
    try {
        dispatch(startProcess())
        dispatch(removeCard())
    } catch (err) {
        dispatch(onErrored(err))
    } finally {
        await new sleep(1000)
        dispatch(endProcess())
    }
}

export const orderProduct = (payload) => async (dispatch, getState) => {
    try {
        dispatch(startProcess())
        const { userInfo } = getState().homePage
        const body = {
            "profile": {
                "name": "sangvm",
                "email": "sangvm@gmail.com",
                "address": "tu nghia - quang ngai",
                "phoneNumber": "123123123",
                "note": "set cứng vì không có "
            },
            "order": payload.map(item => {
                return {
                    productId: item.itemId,
                    quantity: item.itemQuantity,
                    price: item.itemPrice
                }
            })
        }
        await new axiosInstance.post(
            COMMON_ENDPOINT.ADD_TO_CARD,
            body, {
                headers: { user_id: userInfo._id }
            }
        )
        message.success('Order success!')
    } catch (err) {
        dispatch(onErrored(err))
    } finally {
        await new sleep(1000)
        dispatch(endProcess())
    }
}

