import {configureStore} from '@reduxjs/toolkit'
import recomReducer from './Slice/recomReducer'

export default configureStore({
    reducer:{
        recomReducer
    }
})