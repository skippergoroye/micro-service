import { CustomerRepository } from "../database";
import { IUser } from "./customer-service.dto";
import {
  GenerateSalt,
  GeneratePassword,
  GenerateSignature,
  FormatData,
} from "../utils/index";

//Business Logic
class CustomerService {
  repository;

  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignUp(userInput: IUser) {
    const { 
      email, 
      password, 
      phone } = userInput;

    try {
      const existingCustomer = await this.repository.FindCustomer({ email });

      if (existingCustomer) {
        throw new Error("Customer already exist");
      }

      // Generate Salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const customer = await this.repository.CreateCustomer({
        email,
        password: userPassword,
        salt,
        phone,
      });

      const token = GenerateSignature({ email });

      return FormatData({ customer, token });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default CustomerService;
