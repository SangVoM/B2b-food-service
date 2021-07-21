import { Users } from '../api/models/users.model';
import { Category } from '../api/models/category.model';
import { Products } from '../api/models/product.model';
import bcrypt from 'bcrypt';

async function seedData() {
    const jsonCategory = [
        { name: 'Meat & Poultry', code_category: 1 },
        { name: 'Fruit & Vegetables', code_category: 2 },
        { name: 'Drinks', code_category: 3 },
        { name: 'Meat & Poultry', code_category: 4 },
        { name: 'Baking/Cooking Ingredients', code_category: 5 },
        { name: 'Confectionary & Desserts', code_category: 6 }
    ]
    /** Seed user */
    const userInit = await Users.findOne();
    if (!userInit) {
        console.log('----seed db ----')
        console.log('create user');
        let user = [];
        for(let i = 0; i < 2; i++){
            user.push(
                {
                    name: `sangvm${i}`,
                    email : `minhsang1996${i}qn@gmail.com`,
                    password : bcrypt.hashSync('123456', 8)
                }
            )
        }
        await Users.create(user)
    }

    /** Seed category */
    const categoryInit = await Category.findOne();
    if (!categoryInit) {
        console.log('create category')
        await Category.create(jsonCategory)
    }

    /** Seed product */
    const productInit = await Products.findOne();
    if (!productInit) {
        console.log('create product')
        const jsonProduct = [
            { name: 'Chicken Fillets, 6 x 100g', price: '4.50', id_category: '', quantity: 12, code_category: 1, image: 'https://3yis471nsv3u3cfv9924fumi-wpengine.netdna-ssl.com/wp-content/uploads/2010/02/Chicken-Fillets.jpg' },
            { name: 'Cauliflower Florets, 10 x 500g ', price: '6.75', discount: '5.00' ,id_category: '', quantity: 5, code_category: 2, image: 'https://www.recipetineats.com/wp-content/uploads/2020/03/Chipotle-Lime-Roasted-Cauliflower_0.jpg' },
            { name: 'Whole Free-Range Turkey, 1 x 16-18lbs ', price: '45.70', id_category: '', quantity: 6, code_category: 3, image: 'https://images-na.ssl-images-amazon.com/images/I/414M98sqjfL._SX300_SY300_QL70_FMwebp_.jpg' },
            { name: 'Still Mineral Water, 6 x 24 x 500ml ', price: '21.75', id_category: '', quantity: 9, code_category: 4, image: 'https://eatnqc.co.uk/wp-content/uploads/2020/05/Evian-H20-scaled-420x594.jpg' },
            { name: 'Vanilla Ice Cream ', price: '20.75', id_category: '', quantity: 9, code_category: 2, image: 'https://addapinch.com/wp-content/blogs.dir/3/files/2014/07/old-fashioned-vanilla-ice-cream-recipe-DSC_4239.jpg' }
        ]
        return jsonProduct.map(async e => {
            const getIdCategory = await Category.findOne({ code_category: e.code_category })
            e.id_category = getIdCategory._id
            await Products.create(e)
        })
    }
}

export default seedData

