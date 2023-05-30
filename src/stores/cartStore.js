import { defineStore } from 'pinia'
import productStore from './productStore.js';

export default defineStore('cart', {
  // 在此可以使用箭頭函式，不過其它地方一樣不行
  state: () => {
    return {
      // productDetail: [],
      cart: [],
      totalProduct:0,
    };
  },
  actions: {
    addToCart(productId, howMany, total) {

      this.cart.push({
        id: new Date().getTime(),
        productId,
        howMany,
        total,
      }) 

    },
    removeCartItem(id) {
      const index = this.cart.findIndex((item) => { item.id === id })
      console.log(id)
      console.log(this.cart)
      this.cart.splice(index, 1)

    }
  },
  getters: {
    cartList: ({ cart }) => {
      const { posts } = productStore()
      // console.log(posts, 'cartStore/getter/posts')
      // console.log(cart, 'cart')

      const carts = cart.map((item) => {

        // console.log(item, 'item')
        const product = posts.find((product) => product.id === item.productId)

        return {
            ...item,
          product,
          // subtotal: item.howMany * item.total,
        }
      })

      console.log(carts, 'carts')
      // console.log(cart,'cart')

      const initialValue = 0;
      const sum = carts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.total,
        initialValue
        );
        console.log(sum, 'sum')


      return {
        carts,
        sum,
      }
    }
  },
});