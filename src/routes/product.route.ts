import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AppDataSource } from '../config/data-source';
import { multerConfig } from '../config/multer';
import { ProductController } from '../controllers/product.controller';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { validator } from '../middlewares';
import { ProductService } from '../services/product.service';

const productRoutes = Router();

const productController = new ProductController(
  new ProductService(AppDataSource),
);

productRoutes.get(
  '/products',
  (request: Request, response: Response, next: NextFunction) => {
    productController.getAll(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.post(
  '/products',
  multer(multerConfig).single('image'),
  CreateProductDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    productController.create(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.get(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.show(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.put(
  '/products/:id',
  UpdateProductDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    productController.update(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.delete(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.delete(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

export { productRoutes };
