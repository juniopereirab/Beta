import axios from "axios";
import { GetProductsParams } from "../Interfaces/product";
import { IProduct, Product } from "../Models/product";

class ProductService {
  async createProduct(data: Partial<IProduct>) {
    try {
      const newProduct = await Product.create(data)
      return newProduct
    } catch (error) {
      console.log(error)
    }
  }

  async getProducts(params: GetProductsParams) {
    const { search, limit, skip, category } = params
    try {
      const baseUrl = 'https://dummyjson.com/products'
      const hasSearch =  search ? '/search' : ''
      const hasCategory =  category ? `/category/${category}` : ''

      const response = await axios.get(`${baseUrl}${hasSearch}${hasCategory}`, {
        params: {
          skip: skip,
          limit: limit,
          q: search,
        }
      })

      const products = await Product.find({})

      const allProducts = response.data.products.concat(products)
      return {
        ...response.data,
        products: allProducts,
        total: response.data.total + products.length,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getProduct(id: string) {
    try {
      if (isNaN(Number(id))) {
        const product = await Product.findById(id)

        return product
      }

      const product = await axios.get(`https://dummyjson.com/products/${id}`)

      return product.data
    } catch (error) {
      console.log(error)
    }
  }

  async getCategories() {
    try {
    const categories = await axios.get('https://dummyjson.com/products/categories/')

    return categories.data
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct (data: Partial<IProduct>) {
    try {
      if (isNaN(Number(data._id))) {
        const product = await Product.findByIdAndUpdate(data._id, data)
        return product
      }

      const product = await axios.put(`https://dummyjson.com/products/${data._id}`, data)
      return product
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct (id: string) {
    try {
      if (isNaN(Number(id))) {
        await Product.findByIdAndDelete(id)

        return { removed: true }
      }

      await axios.delete(`https://dummyjson.com/products/${id}`)
      
      return { removed: true }
    } catch (error) {
      console.log(error)
      return { removed: false }
    }
  }

}

export const productService = new ProductService()