import { configureStore } from '@reduxjs/toolkit'
import statusReducer from './modules/chat-store'

const store = configureStore({
    reducer: {
        status: statusReducer
    }
})

export default store