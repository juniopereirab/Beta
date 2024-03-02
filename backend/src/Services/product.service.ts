import { IProduct, Product } from "../Models/product";

export class ProductService {
  async createProduct(data: IProduct) {
    try {
      const newProduct = await Product.create(data)
      return newProduct
    } catch (error) {
      console.log(error)
    }
  }

  async getProducts() {
    try {
      const products = await Product.find({})
      return products
    } catch (error) {
      console.log(error)
    }
  }

  async getProduct(id: number) {
    try {
      const product = await Product.findOne({ _id: id })
      return product
    } catch (error) {
      console.log(error)
    }
  }

  async getCategories() {
    try {
    // Fazer requisição para DummyJson
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct (data: IProduct) {
    try {
      const product = await Product.updateOne({ _id: data._id }, data)
      return product
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct (id: number) {
    try {
      await Product.deleteOne({ _id: id })
      return
    } catch (error) {
      console.log(error)
    }
  }

}