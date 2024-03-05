import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { editProduct, getCategories, getProducts } from './productService'
import { IProduct } from '../../../interfaces/Product'
import { ProductsReturn } from '../../../interfaces/Responses'
import { orderBy } from '@/utils/array'

interface ProductState {
    categories: string[]
    products: IProduct[]
    originalProducts: IProduct[]
    page: number
    search: string
    category: string
    total: number
    ordering: "title" | "brand" | ""
}

const initialState: ProductState = {
    categories: [],
    products: [],
    originalProducts: [],
    page: 1,
    search: '',
    category: '',
    total: 0,
    ordering: '',
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
        setOrdering(state, action: PayloadAction<'title' | 'brand' | ''>) {
            state.ordering = action.payload

            if (!!action.payload) {
                state.products = orderBy(state.products, action.payload)
            } else {
                state.products = state.originalProducts
            }
        }
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
                if (action.payload) {
                    let products = action.payload.products
                    if (!!state.ordering) {
                        products = orderBy(action.payload.products, state.ordering)
                    }
                    return {
                        ...state,
                        products,
                        originalProducts: action.payload.products,
                        total: action.payload.total
                    }
                }
                return { ...state }
            })
    }
})

export const { setPage, setCategory, setSearch, cleanState, setOrdering } = productSlice.actions
export default productSlice.reducer