import { CustomerModel, ICustomer } from "../models";

export class CustomerRepository {
  async CreateCustomer({ email, password, salt, phone }: ICustomer) {
    try {
      const customer = new CustomerModel({
        email,
        password,
        salt,
        phone,
      });

      const customerResult = await customer.save();
      return customerResult;
      
    } catch (error) {
      console.log(error);
    }
  }

  async FindCustomer({ email }: { email: string }) {
    try {
      const existingCustomer = await CustomerModel.findOne({ email });
      return existingCustomer;
    } catch (error) {
      console.log(error)
    }
  }
}
