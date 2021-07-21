import {jsonSuccess} from '../../utils/result'
import {STATUS_CODE} from '../../constant/statusCode'
import { Category } from '../models/category.model'
import { Products } from '../models/product.model';
import { pagination } from '../../utils/common';

export const listCategory = async (req, res) => {
    const categoryResult = await Category.find().lean();
    const productResult = await Products.find().lean();
    const result = categoryResult.map(item => {
        let products = [];
        productResult.map(el => {
            if (Number(item.code_category) === Number(el.code_category)) {
                products.push(el)
            }
        })
        return {...item, products}
    })
    return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(result))
}

export const listProduct = async (req, res) => {
    let { limit, page, category_id } = req.query;
    let page_options = pagination({ limit, page });
    const condition = {}
    if (category_id) {
        condition.id_category = category_id
    }
    const result = await Products.find(condition)
        .skip(page_options.page * page_options.limit)
        .limit(page_options.limit).populate({
        path: 'id_category',
        select: 'name'
    })
    return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(result))
}
