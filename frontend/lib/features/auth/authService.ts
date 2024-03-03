import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'
import { LoginParam } from '../../../interfaces/Requests'

export const login = createAsyncThunk<any, LoginParam>('auth/login', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/login', data)

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})