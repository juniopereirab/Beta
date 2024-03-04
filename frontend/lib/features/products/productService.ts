import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'
import { CATEGORIES, PRODUCTS } from '../../endpoints'
import { RootState } from '../../store'
import { ProductGetParam } from '../../../interfaces/Requests'
import { IProduct } from '../../../interfaces/Product'

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

export const createProduct = createAsyncThunk<any, Partial<IProduct>>('products/create', async (data, {getState, rejectWithValue}) => {
    try {
        const { auth }: RootState = getState()
        const response = await api.post(PRODUCTS, data, {
            headers: {
                Authorization: auth.token
            }
        })

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const editProduct = createAsyncThunk<any, Partial<IProduct>>('products/create', async (data, {getState, rejectWithValue}) => {
    try {
        const { auth }: RootState = getState()
        const response = await api.put(`${PRODUCTS}/${data._id || data.id}`, data, {
            headers: {
                Authorization: auth.token
            }
        })

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getProductDetail = createAsyncThunk<any, {id: string | number}>('product/detail', async ({ id }, { getState, rejectWithValue }) => {
    try {
        const { auth }: RootState = getState()
        const response = await api.get(`${PRODUCTS}/${id}`, {
            headers: {
                Authorization: auth.token
            }
        })

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteProduct = createAsyncThunk<any, {id: string | number}>('product/detail', async ({ id }, { getState, rejectWithValue }) => {
    try {
        const { auth }: RootState = getState()
        const response = await api.delete(`${PRODUCTS}/${id}`, {
            headers: {
                Authorization: auth.token
            }
        })

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})