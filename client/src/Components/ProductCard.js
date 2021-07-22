import { memo, useState } from 'react';
import { Card, Col, Row, Button, Divider, notification, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { addCartAction, removeItemCartAction } from '../Pages/Cart/store/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectListProduct } from '../Pages/Cart/store/selector'

const ProductCard = (props) => {
    const [quantity, setQuantity] = useState();
    const dispatch = useDispatch()
    const listOrder = useSelector(selectListProduct, shallowEqual)
    const addCart = (item) => {
        dispatch(addCartAction(item))
        openNotification();
    };

    const onChangeNumber = (e) => {
        setQuantity(e)
    }

    const removeItem = (item) => {
        dispatch(removeItemCartAction(item))
    }

    const openNotification = () => {
    notification.open({
      style: {
        color: '#1DA57A',
        fontWeight: 'bold',
        opacity: 0.9,
        cursor: 'pointer',
      },
      placement: 'bottomRight',
      message: 'Item Added',
      description: `${props.itemName} is added to your cart.`,
      duration: 4,
    });
  };

  return (
    <Col key={props.itemId} md={8}>
      <Card
        hoverable
        style={{ padding: 10 }}
        cover={
          <img
            height='320px'
            width='280px'
            alt='example'
            src={props.itemImage}
          />
        }
      >
        <Card.Meta
          title={<h2>{props.itemName}</h2>}
          description={props.itemDescription}
        />
        <br></br>
        <Divider orientation='center'>Price</Divider>
        <p
          style={{
            lineHeight: '28px',
            fontWeight: 'lighter',
            fontSize: '46px',
            color: '#2ecc71',
            textAlign: 'center',
          }}
        >
          {props.itemPrice}
        </p>
        <Row gutter={[10]} className='add-cart-btn-row'>
          <Col>
              <InputNumber disabled={listOrder ? listOrder.filter((elem) => elem.itemId === props.itemId).length : false } min={1} max={props.itemQuantity} defaultValue={1} onChange={onChangeNumber} />
          </Col>
          <Col>
            <Button
              title='Add item to cart'
              disabled={listOrder ? listOrder.filter((elem) => elem.itemId === props.itemId).length : false }
              onClick={() =>
                addCart({
                  itemId: props.itemId,
                  itemName: props.itemName,
                  itemPrice: props.itemPrice,
                  itemDescription: props.itemDescription,
                  itemQuantity: quantity || 1,
                  itemCodeCategory: props.itemCodeCategory
                })
              }
              type='primary'
            >
              Add to cart
            </Button>
          </Col>
          <Col>
            <Button
              title='Remove item from cart'
              disabled={
                !(listOrder
                  ? listOrder.filter((elem) => elem.itemId === props.itemId)
                      .length
                  : false)
              }
              onClick={() => removeItem(props.itemId)}
              type='primary'
              danger
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};


export default memo(ProductCard)
