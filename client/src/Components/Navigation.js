import { Menu, Select } from 'antd';
import { ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux'
import { selectListUser, selectUserInfo} from '../Pages/store/selector'
import { selectListProduct } from '../Pages/Cart/store/selector'
import { loginUser } from '../Pages/store/actions';

const { Option } = Select;

const Navigation = (props) => {
  const dispatch = useDispatch()
  const listUser = useSelector(selectListUser, shallowEqual)
  const userInfo = useSelector(selectUserInfo, shallowEqual)
  const listProduct = useSelector(selectListProduct, shallowEqual)

  return (
    <div>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={props.url}>
        <Menu.Item key='1' onClick={() => props.setUrl('1')}>
          <Link to='/'>
            <HomeOutlined />
          </Link>
        </Menu.Item>
        <Menu.Item key='2' onClick={() => props.setUrl('2')}>
          <Link to='/cart'>
            Cart <ShoppingCartOutlined /> <strong>({listProduct.length})</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key='3' onClick={() => props.setUrl('3')}>
          <Select
              labelInValue
              defaultValue={{ value: userInfo?.name || 'Please login' }}
              style={{ width: 120 }}
              onChange={(e) => dispatch(loginUser({ user_name: e.value, password: '123456' }))}>
            { listUser?.map((item) => (
                <Option key={item?.email} value={item?.email}>{item?.name}</Option>
            ))}
          </Select>
        </Menu.Item>
      </Menu>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    url: state.url,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUrl: (urlKey) => dispatch({ type: 'SET_URL', payload: urlKey }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
