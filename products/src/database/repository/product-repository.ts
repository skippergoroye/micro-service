import { ProductModel, IProduct  } from '../models'

export class ProductRepository {

    async CreateProduct ({  
        name,
        desc,
        banner,
        type,
        unit,
        price,
        avaliable,
        suplier }:IProduct ) {
        try {
            const product = new ProductModel ({
                name,
                desc,
                banner,
                type,
                unit,
                price,
                avaliable,
                suplier
            })

            const productResult = await product.save()
            return productResult

        } catch (error) {
            console.log(error)
        }
    }

    // async FindCustomer ({email}:{email:string}) {
    //     const existingCustomer = await ProductModel.findOne({email});
        
    //     return existingCustomer
    // }
}