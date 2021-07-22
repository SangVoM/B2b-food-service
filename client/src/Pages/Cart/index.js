import {memo, useEffect, useState} from 'react';
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
  Input
} from 'antd';
import { CreditCardOutlined, DeleteOutlined } from '@ant-design/icons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectListProduct, selectLoading } from './store/selector';
import { selectUserInfo } from '../store/selector';
import { removeCardAction, orderProduct } from './store/actions'
import { message } from 'antd';
import { formatMoney, convertMoneyNumber, countMoney, countPrintMoney } from '../../utils/helper';

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
      key: 'itemCost',
      dataIndex: 'itemCost',
      render: (text, record) => (
        <Space size='middle'>
          <p>£{formatMoney(text)}</p>
          {record.itemDiscount ? (
              <p style={{ textDecoration: 'line-through'}}>£{formatMoney(record.itemDiscount)}</p>
          ) : ''}
        </Space>
      ),
    },
  ];
  const dispatch = useDispatch()
  const listOrder = useSelector(selectListProduct, shallowEqual)
  const userInfo = useSelector(selectUserInfo, shallowEqual)
  const loading = useSelector(selectLoading, shallowEqual)
  const voucher = '20OFFPROMO'
  const discount100000 = 30000

  const [typingInput, setTypingInput] = useState(false);
  const [totalPriceProduct, setTotalPriceProduct] = useState();
  const { total, dataOrder} = countPrintMoney(listOrder)
  const [flag,setFlag] = useState(true)

  useEffect(() => {
    if (flag) {
      setTotalPriceProduct(countMoney(total))
    }
  })

  const onChangeRemove = () => {
    dispatch(removeCardAction())
  }

  const orderSubmit = () => {
    if (!userInfo) return  message.error('Please login')
    if (listOrder.length === 0) return message.error('Please choose product')
    dispatch(orderProduct(listOrder|| []))
  }

  const applyVoucher = () => {
    const voucherInput = document.getElementById('code_voucher').value
    if (!dataOrder.length) {
      message.error('Please order product')
    } else if (voucherInput === voucher && convertMoneyNumber(countMoney(total)) >= discount100000) {
      console.log('apply voucher')
      const discount2000 = totalPriceProduct - 2000
      setTotalPriceProduct(discount2000)
      setFlag(false)
    } else {
      message.error('Voucher is not valid')
    }
  }

  const checkLengthInput = (e) => {
    if (e.target.value.length) {
      setTypingInput(false)
    } else {
      setTypingInput(true)
      setFlag(true)
    }
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
          <Table columns={columns} dataSource={dataOrder} pagination={false} />
          <Divider orientation='right'>
            <p>Billing</p>
          </Divider>
          <br></br>
          <Row>
            <Col span={12}>
              <Col span={8}>
                <Input onChange={(e) => checkLengthInput(e) } placeholder="Code voucher" id='code_voucher' />
                <Button disabled={typingInput} onClick={()=>applyVoucher()} style={{ marginTop: 16 }}>Apply</Button>
              </Col>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Statistic
                  title='Total (tax incl).'
                  value={`$ ${formatMoney(totalPriceProduct)}`}
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
