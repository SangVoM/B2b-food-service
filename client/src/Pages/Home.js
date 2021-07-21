import { useEffect } from 'react';
import { Layout, Row } from 'antd';
import ProductCard from '../Components/ProductCard';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getListCategory, getListUser, getListProduct } from './store/actions'
import MenuCategory from '../Components/MenuCategory'
import { selectListProduct } from './store/selector'

const { Content } = Layout;
const Home = () => {
  const dispatch = useDispatch()
  const listProduct = useSelector(selectListProduct, shallowEqual)
  useEffect(() => {
    dispatch(getListUser())
    dispatch(getListCategory())
    dispatch(getListProduct())
  }, [])

  return (
    <div>
      <Layout style={{ padding: '24px 0' }}>
        <Content className='site-layout-background'>
           <MenuCategory/>
          <h1>Buy Online</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
          <center>
            <Row justify='start' gutter={[40, 16]} className='products-row'>
              {listProduct?.map((elem) => {
                return (
                  <ProductCard
                    key={elem._id}
                    itemId={elem._id}
                    itemName={elem.name}
                    itemDescription={elem.content}
                    itemImage= {elem.image}
                    itemPrice={elem.price}
                    itemQuantity={elem.quantity}
                  />
                );
              })}
            </Row>
          </center>
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
