import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectListCategory } from '../Pages/store/selector'
import { getListProduct } from '../Pages/store/actions'
const { SubMenu } = Menu;

const MenuCategory = () => {
    const dispatch = useDispatch()
    const listCategory = useSelector(selectListCategory, shallowEqual)
    const handleClick = e => {
        dispatch(getListProduct({ category_id: e.key }))
    };
    return (
        <Menu onClick={handleClick} mode="horizontal">
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="CATEGORY">
                <Menu.ItemGroup>
                    <Menu.Item key='all'>All Product</Menu.Item>
                </Menu.ItemGroup>
                { listCategory.map(item => (
                    <Menu.ItemGroup key={item._id + 1} title={item.name}>
                        {item.products.map(el => (
                            <Menu.Item key={item._id}>{el.name}</Menu.Item>
                        ))}
                    </Menu.ItemGroup>
                )) }
            </SubMenu>
        </Menu>
    )
}

export default memo(MenuCategory)
