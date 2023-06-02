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

            this.addToCartAPI(currentCart.howMany, productId)

          } else {
            this.cart.push({
              id: new Date().getTime(),
              productId,
              howMany,
              total,
            }) 
            this.addToCartAPI(howMany, productId)
          }

 


    },
    removeCartItem(id) {
      const index = this.cart.findIndex((item) => { item.id === id })
      console.log(id)
      console.log(this.cart)
      this.cart.splice(index, 1)

    },
    addToCartAPI(howMany, productId) {

            const tokenNow = localStorage.getItem("token");

      
           fetch("https://tom-store-api.onrender.com/tom-store-api/shoppingCart", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NDQ0Y2UxOTY0MWZjNjAzMWE1ZDNkZTEiLCJpc3MiOiJodHRwczovL3RvbS1zdG9yZS1hcGkub25yZW5kZXIuY29tIiwibWVtYmVyVHlwZXMiOiJBRE1JTixTRUxMRVIsQ1VTVE9NRVIiLCJleHAiOjE2ODU2OTA3NjQsImlhdCI6MTY4NTY4NzE2NCwianRpIjoiNWZmYWE0NDg1ODBhNDI0OTlkNDVlNTQxYzYyZGI4ZjgifQ.bKLl9StVJuk4pcokxbhQbGfdtLuv8OQVxvNoMZ8v80FVj182Mk92MzugXSMSJZovmfAgzvbZWqjQIM0LknBWVw" 
            },
            body: JSON.stringify({
              "productAmount": 2,
              "productId":'6447f490e0946a0fcd26eab1',
            }),
            })
            .then(response => response.json())
            .then(data => {
              console.log(data, 'data')
          
        })
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