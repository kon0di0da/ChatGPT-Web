import { configureStore } from '@reduxjs/toolkit'
import statusReducer from './modules/statusStore'

const store = configureStore({
    reducer: {
        status: statusReducer
    }
})

export default store