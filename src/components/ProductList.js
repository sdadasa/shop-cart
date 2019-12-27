import React from 'react';
import { connect } from 'dva';
import { Card, Button, Popover, List, Row, Col, Select } from 'antd';
const { Option } = Select;

class ProductList extends React.Component {
    render() {
        const { products, addToCart, screen, changeScreen, changeSort } = this.props;
        const allsize = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
        const sizelist = allsize.map((item, key) => (
            <Button onClick={() => changeScreen(item)} style={{ margin: 5 }} shape="circle" key={key} type={screen.includes(item) ? "primary" : "default"}>{item}</Button>
        ));
        const list = (products || []).map((item, key) => (
            <Card style={{ width: 300, margin: 10 }} key={key}>
                <img src={"./static/products/" + item.sku + "_1.jpg"} alt={item.title + "_1.jpg"} style={{ width: 252 }}></img>
                <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
                <hr style={{ width: "10%", backgroundColor: 'black' }} />
                <h4 style={{ textAlign: 'center' }}>{item.currencyFormat + item.price}</h4>
                <Popover
                    content={
                        <List
                            size="small"
                            dataSource={item.availableSizes}
                            renderItem={sitem => <List.Item><Button onClick={() => addToCart(item.id, sitem)} block>{sitem}</Button></List.Item>}
                        />
                    }
                    title="Selective size"
                    trigger="click">
                    <Button size="large" block>Add to cart</Button>
                </Popover>
            </Card>
        ));
        return (
            <Row>
                <Col span={4}>
                    <div style={{ margin: 5 }}><h2>Sizes:</h2></div>
                    <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-start' }}>
                        {sizelist}
                    </div>
                </Col>
                <Col span={20}>
                    <div style={{ margin: 5, display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
                        <div><h3 style={{ margin: 5 }}>{products.length + " Product(s) found."}</h3></div>
                        <div style={{ marginRight: 20 }}>
                            <h2>Order by</h2>
                            <Select defaultValue="default" style={{ width: 160 }} onChange={(value)=>changeSort(value)}>
                                <Option value="default">Default</Option>
                                <Option value="high">Highest to lowest</Option>
                                <Option value="low">Lowest to highest</Option>
                            </Select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                        {list}
                    </div>
                </Col>
            </Row>
        )
    }
}
const mapStateToProps = ({ products }) => ({
    products: products.result,
    screen: products.screen
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (id, size) => dispatch({
        type: 'cart/addToCart',
        payload: {
            id,
            size
        }
    }),
    changeScreen: (size) => {
        dispatch({
            type: 'products/changeScreen',
            payload: size
        })
        dispatch({
            type: 'products/query'
        })
    },
    changeSort: (sort) => {
        dispatch({
            type: 'products/changeSort',
            payload: sort
        })
        dispatch({
            type: 'products/query'
        })
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);