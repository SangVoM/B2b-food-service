import { memo } from 'react';
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Table,
  Space,
  Divider,
  Statistic,
  Button,
} from 'antd';
import { CreditCardOutlined, DeleteOutlined } from '@ant-design/icons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectListProduct, selectLoading } from './store/selector';
import { selectUserInfo } from '../store/selector';
import { removeCardAction, orderProduct } from './store/actions'
import { message } from 'antd';

const { Content } = Layout;
const Index = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'itemId',
      key: 'itemId',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Quantity',
      dataIndex: 'itemQuantity',
      key: 'itemQuantity'
    },
    {
      title: 'Price',
      key: 'itemPrice',
      dataIndex: 'itemPrice',
      render: (text, record) => (
        <Space size='middle'>
          <p>{text}</p>
        </Space>
      ),
    },
  ];
  const dispatch = useDispatch()
  const listOrder = useSelector(selectListProduct, shallowEqual)
  const userInfo = useSelector(selectUserInfo, shallowEqual)
  const loading = useSelector(selectLoading, shallowEqual)
  const total = [0];
  listOrder.forEach((elem) => total.push(+elem.itemPrice));

  const onChangeRemove = () => {
    dispatch(removeCardAction())
  }

  const orderSubmit = () => {
    if (!userInfo) return  message.error('Please login')
    if (listOrder.length === 0) return message.error('Please choose product')
    dispatch(orderProduct(listOrder|| []))
  }

  return (
    <div>
      <Layout>
        <Content className='site-layout-background'>
          <Breadcrumb>Cart</Breadcrumb>
          <br></br>
          <Row justify='end'>
            <Col>
              <Button type='default' onClick={() => onChangeRemove()} danger>
                <DeleteOutlined />
                &nbsp;
                <span>Delete Cart</span>
              </Button>
            </Col>
          </Row>
          <h2>
            Total Items <strong>({listOrder.length})</strong>
          </h2>
          <br></br>
          <Table columns={columns} dataSource={listOrder} pagination={false} />
          <Divider orientation='right'>
            <p>Billing</p>
          </Divider>
          <br></br>
          <Row justify='end'>
            <Col>
              <Statistic
                title='Total (tax incl).'
                value={`$ ${Math.round(
                  total.reduce((total, num) => total + num)
                ).toFixed(2)}`}
                precision={2}
              />
              <Button disabled={loading} onClick={() => orderSubmit()} style={{ marginTop: 16 }} type='primary'>
                Pay now <CreditCardOutlined />
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default memo(Index);
