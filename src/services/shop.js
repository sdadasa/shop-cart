import axios from 'axios'

export default {
  getProducts: () => axios.get('./data/products.json'),
  buyProducts: (payload) => new Promise((resolve, reject) => setTimeout(() => resolve(payload), 2000)) //只是为了模拟axios.post的效果
}
