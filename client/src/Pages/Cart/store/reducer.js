import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: null,
    card: []
}

export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        startProcess(state) {
            state.loading = true
        },
        onErrored(state, action) {
            state.error = action.payload
        },
        addCard(state, action) {
            state.card = [...state.card, action.payload]
        },
        removeItemOfCard(state, action) {
            state.card = state.card.filter((elem) => elem.itemId !== action.payload)
        },
        removeCard(state, action) {
            state.card = []
        },
        endProcess(state) {
            state.loading = false
        }
    }
})
