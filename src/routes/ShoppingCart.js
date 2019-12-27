import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { Layout, Drawer, Button, Row, Col, Badge } from 'antd';

const { Header, Footer, Content } = Layout;
class ShoppingCart extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'products/query'
        });
    }
    render() {
        const { count } = this.props;
        return (
            <div>
                <Layout>
                    <Header>
                    </Header>
                    <Content>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}><ProductList /></Col>
                            <Col span={2}></Col>
                        </Row>
                    </Content>
                    <Footer></Footer>
                </Layout>
                <div style={{ position: 'fixed', top: 45, right: 40 }}>
                    <Badge count={count} showZero>
                        <Button size="large" onClick={this.showDrawer} shape="round">Your cart</Button>
                    </Badge>
                </div>
                <Drawer
                    title="Your cart"
                    width="500"
                    placement="right"
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Cart />
                </Drawer>
            </div>
        )
    }
}
const mapStateToProps = ({ cart }) => ({
    count: cart.count
})
export default connect(mapStateToProps)(ShoppingCart);