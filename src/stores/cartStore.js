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
      // 取得已經有加入購物車的項目
      // 進行判斷，如果購物車有該項目則 +1，如果沒有則是新增一個購物車項目

      const currentCart = this.cart.find((item) => item.productId === productId)
      
      if (currentCart) {
        currentCart.howMany += howMany
        currentCart.total += total

      } else {
        this.cart.push({
          id: new Date().getTime(),
          productId,
          howMany,
          total,
        }) 
      }


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

      const carts = cart.map((item) => {

        const product = posts.find((product) => product.id === item.productId)

        return {
            ...item,
          product,
        }
      })

      // console.log(carts, 'carts')

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