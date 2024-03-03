import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'
import { LoginParam, RegisterParam } from '../../../interfaces/Requests'
import { LOGIN, REGISTER } from '../../endpoints'

export const login = createAsyncThunk<any, LoginParam>('auth/login', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post(LOGIN, data)

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const register = createAsyncThunk<any, RegisterParam>('auth/register', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post(REGISTER, data)
        
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})