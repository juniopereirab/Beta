import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { editProduct, getCategories, getProducts } from './productService'
import { IProduct } from '../../../interfaces/Product'
import { ProductsReturn } from '../../../interfaces/Responses'
import { replaceItem } from '@/utils/array'

interface ProductState {
    categories: string[]
    products: IProduct[]
    page: number
    search: string
    category: string
    total: number
}

const initialState: ProductState = {
    categories: [],
    products: [],
    page: 1,
    search: '',
    category: '',
    total: 0,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        cleanState(state) {
            state.page = 1
            state.category = ''
            state.search = ''
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
            state.category = initialState.category
            state.page = 1
        },
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
            state.search = initialState.search
            state.page = 1
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
                return {
                    ...state,
                    categories: action.payload
                }
            })
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<ProductsReturn>) => {
                return {
                    ...state,
                    products: action.payload.products,
                    total: action.payload.total
                }
            })
    }
})

export const { setPage, setCategory, setSearch, cleanState } = productSlice.actions
export default productSlice.reducer