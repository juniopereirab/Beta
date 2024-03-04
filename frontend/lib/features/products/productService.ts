import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'
import { CATEGORIES, PRODUCTS } from '../../endpoints'
import { RootState } from '../../store'
import { ProductGetParam } from '../../../interfaces/Requests'

export const getCategories = createAsyncThunk('product/categories', async (_, { rejectWithValue, getState }) => {
    try {
        const { auth }: RootState = getState()
        const response = await api.get(CATEGORIES, {
            headers: {
                Authorization: auth.token
            }
        })

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getProducts = createAsyncThunk<any, ProductGetParam>('products/list', async (data, { getState, rejectWithValue }) => {
    try {
        const { auth }: RootState = getState()
        const response = await api.get(PRODUCTS, {
            params: data,
            headers: {
                Authorization: auth.token
            }
        })

        return response.data
    } catch (error) {
        rejectWithValue(error)
    }
})