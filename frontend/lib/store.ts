import { configureStore, EnhancedStore, ThunkDispatch } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import productReducer from './features/products/productSlice'
import { persistCombineReducers, persistStore } from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'

const persistConfig = {
    key: 'beta-project',
    storage: sessionStorage,
    whitelist: ['auth'],
}

const persistedReducers = persistCombineReducers(persistConfig, {
    auth: authReducer,
    product: productReducer,
})

export const store: EnhancedStore = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)