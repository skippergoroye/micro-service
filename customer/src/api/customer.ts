import express, { Request, Response, NextFunction } from 'express'
import CustomerService from "../services/customer-service";

export const Customer = (app:express.Application) => {

    const service = new CustomerService()

    app.post('/signup', async(req:Request, res:Response, next:NextFunction) => {
        try {
            const { email, password, phone } = req.body

            const data = await service.SignUp({ email, password, phone })

            return res.status(201).json(data)

        } catch (error) {
            console.log(error)
            next(error) 
        }
    })


    app.post('/login', async(req:Request, res:Response, next:NextFunction) => {
        try {
            const { email, password } = req.body

            const data = await service.SignIn({ email, password })

            return res.status(201).json(data)

            // return res.status(201).json({
            //     data,
            //     message: "Login successfull"
            // })
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
}



