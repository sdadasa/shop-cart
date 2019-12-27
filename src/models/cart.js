import shop from '../services/shop';

const initialState = {
  added: [],
  quantities: {
  },
  count: 0
}

const cart = {
  namespace: "cart",
  state: initialState,
  effects: {
    *add({ payload: { id } }, { call, put, select }) {
    },
    *checkout(action, { call, put, select }) {
      const { cart } = yield select();
      console.log("checkout cart", cart);
      const res = yield call(shop.buyProducts, cart);
      yield put({
        type: "checkoutCompleted",
        payload: res
      });
    }
  },
  reducers: {
    addToCart: (state, { payload: { id, size } }) => {
      return {
        ...state,
        added: state.added.findIndex((v) => { return v.id === id && v.size === size }) === -1 ? [...state.added, { id, size }] : [...state.added],
        quantities: {
          ...state.quantities,
          [id + size]: (state.quantities[id + size] || 0) + 1
        },
        count: state.count + 1
      }
    },
    minusOne: (state, { payload: { id, size } }) => {
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [id + size]: state.quantities[id + size] - 1
        },
        count: state.count - 1
      }
    },
    removeFromCart: (state, { payload: { id, size, quantity } }) => {
      state.added.splice(state.added.findIndex((v) => { return v.id === id && v.size === size }),1)
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [id + size]: 0
        },
        count: state.count - quantity
      }
    },
    checkoutCompleted: () => initialState
  }
}
export default cart;