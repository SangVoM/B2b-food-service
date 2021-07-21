import { Router } from 'express'
import { listCategory, listProduct } from '../controller/productCategory.controller'

const productCategoryRouter = Router()
productCategoryRouter.get('/list-category', listCategory)
productCategoryRouter.get('/list-product', listProduct)
export default productCategoryRouter
