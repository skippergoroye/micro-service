import { CustomerRepository } from "../database";
import { IUser, IUserSignIn } from "./customer-service.dto";
import {
  GenerateSalt,
  GeneratePassword,
  GenerateSignature,
  FormatData,
  validatePassword,
} from "../utils/index";

//Business Logic
class CustomerService {
  repository;

  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignUp(userInput: IUser) {
    const { email, password, phone } = userInput;

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
        cart: []
      });

      const token = await GenerateSignature({ email });

      return FormatData({ customer, token });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async SignIn(userInput: IUserSignIn) {
    const { email, password } = userInput;

    try {
      
      const existingCustomer = await this.repository.FindCustomer({ email });

      if (existingCustomer) {
        const validPassword = await validatePassword(password, existingCustomer.password, existingCustomer.salt );

        if (validPassword) {
          const token = await GenerateSignature({ email });

          return FormatData({ _id: existingCustomer._id, token });
        }
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default CustomerService;
