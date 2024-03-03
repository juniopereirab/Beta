import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<ThunkDispatch<any, any, any>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector