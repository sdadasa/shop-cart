import React from 'react';
import { connect } from 'dva';
import { Button, List } from 'antd';
const Cart = props => {
    const { products, subtotal, onCheckout, loading, checking, addToCart, minusOne, removeFromCart } = props;
    return (
        <div style={{ height: 600 }}>
            <div style={{ height: '75%', overflow: 'auto' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={products}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Button.Group size="small">
                                    <Button onClick={() => minusOne(item.id,item.size)} disabled={item.quantity===1}> - </Button>
                                    <Button onClick={() => addToCart(item.id,item.size)}> + </Button>
                                </Button.Group>,
                                <Button onClick={() => removeFromCart(item.id,item.size,item.quantity)} shape="circle" type="danger">X</Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<img src={"./static/products/" + item.sku + "_2.jpg"} alt={item.title + "_2.jpg"} style={{ width: 50 }} />}
                                title={item.title}
                                description={item.size+" | " + item.style}
                            />
                            <div>x {item.quantity}</div>
                        </List.Item>
                    )}
                />
            </div>
            <div style={{ height: '25%' }}>
                <h3 style={{ textAlign: 'center' }}>Subtotal: ${subtotal}</h3>
                <Button onClick={onCheckout} disabled={subtotal <= 0.00 || loading} size="large" block>{checking ? <div style={{ color: 'red' }}>Checkout...</div> : <div>Checkout</div>}</Button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ cart, products, loading }) => ({
    products: cart.added.map(({id,size}) => ({ ...products.allproducts.filter(item => item.id === id)[0], size:size, quantity: cart.quantities[id+size] })),
    subtotal: cart.added.reduce((amount, {id,size}) => products.allproducts.filter(item => item.id === id)[0].price * cart.quantities[id+size] + amount, 0).toFixed(2),
    loading: loading.models['cart'],
    checking: loading.effects['cart/checkout']
})

const mapDispatchToProps = (dispatch) => ({
    onCheckout: () => dispatch({
        type: 'cart/checkout'
    }),
    addToCart: (id,size) => dispatch({
        type: 'cart/addToCart',
        payload: {
            id,
            size
        }
    }),
    minusOne: (id,size) => dispatch({
        type: 'cart/minusOne',
        payload: {
            id,
            size
        }
    }),
    removeFromCart: (id,size,quantity) => dispatch({
        type: 'cart/removeFromCart',
        payload: {
            id,
            size,
            quantity
        }
    })
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
