import shop from '../services/shop';

const products = {
    namespace: "products",
    state: {
        allproducts:[],
        result:[],
        screen:[],
        sort:"default"
    },
    effects: {
        *query(action, { call, put, select }) {
            const res = yield call(shop.getProducts);
            yield put({
                type: "setAllProducts",
                payload: res.data.products
            });
            const { products } = yield select();
            if( products.screen.length === 0 ) {
                if( products.sort === "default" ){
                    yield put({
                        type: "setProducts",
                        payload: res.data.products
                    });
                    return
                }else if( products.sort === "high"){
                    const result = new Array(...res.data.products);
                    yield put({
                        type: "setProducts",
                        payload: result.sort((a,b) => (b.price-a.price))
                    });
                    return
                }else if( products.sort === "low"){
                    const result = new Array(...res.data.products);
                    yield put({
                        type: "setProducts",
                        payload: result.sort((a,b) => (a.price-b.price))
                    });
                    return
                }
                yield put({
                    type: "setProducts",
                    payload: res.data.products
                });
                return
            }
            const result = res.data.products.filter(item=>{
                for(let value of products.screen.values()){
                    if(item.availableSizes.includes(value)){
                        return true;
                    }
                }
                return false;
            });
            if( products.sort === "default" ){
                yield put({
                    type: "setProducts",
                    payload: result
                });
                return
            }else if( products.sort === "high"){
                yield put({
                    type: "setProducts",
                    payload: result.sort((a,b) => (b.price-a.price))
                });
                return
            }else if( products.sort === "low"){
                yield put({
                    type: "setProducts",
                    payload: result.sort((a,b) => (a.price-b.price))
                });
                return
            }
            yield put({
                type: "setProducts",
                payload: result
            });
            return
        }
    },
    reducers: {
        setAllProducts: (state, { payload }) => {
            return {
                ...state,
                allproducts: payload
            }
        },
        setProducts: (state, { payload }) => {
            return {
                ...state,
                result: payload
            }
        },
        changeScreen: (state, { payload })=>{
            const findindex=state.screen.findIndex((v)=>{return v === payload });
            if(findindex===-1){
                return {
                    ...state,
                    screen:[...state.screen,payload]
                }
            }
            state.screen.splice(findindex,1);
            return {
                ...state
            }
        },
        changeSort: ( state, { payload="default" } ) => {
            return {
                ...state,
                sort: payload
            }
        }
    }
}
export default products;