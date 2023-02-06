import express, { Request, Response, NextFunction } from "express";
import ProductService from "../services/product-service";

import userAuth from '../api/middlewares/auth'

export const Product = (app: express.Application) => {
  const service = new ProductService();

  app.post( "/create",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { 
            name,
            desc,
            banner,
            type,
            unit,
            price,
            avaliable,
            suplier, } = req.body;

        const data = await service.ProductsCreate({ 
            name,
            desc,
            banner,
            type,
            unit,
            price,
            avaliable,
            suplier, });

        return res.status(201).json(data);
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );
};
