import { ProductRepository } from "../database";
import { IProductDTO } from "./product-service.dto";
import { FormatData } from '../utils'

//Business Logic
class ProductService {
  repository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async ProductsCreate(productInput: IProductDTO) {
    const { 
      name,
      desc,
      banner,
      type,
      unit,
      price,
      avaliable,
      suplier } = productInput;

    try {
      const products = await this.repository.CreateProduct({
        name,
        desc,
        banner,
        type,
        unit,
        price,
        avaliable,
        suplier
      })

      return FormatData
      
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default ProductService;
