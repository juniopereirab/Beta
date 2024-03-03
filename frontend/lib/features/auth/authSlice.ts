import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login } from './authService'
import { IUser } from '../../../interfaces/User'
import { LoginReturn } from '../../../interfaces/Responses'

interface AuthState {
    token: string
    isAuthenticated: boolean
    user: IUser | null
}

const initialState: AuthState = {
    token: '',
    isAuthenticated: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            return initialState
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginReturn>) => {
            return {
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
            }
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer