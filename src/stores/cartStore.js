import { defineStore } from 'pinia'
import productStore from './productStore.js';

export default defineStore('cart', {
  // 在此可以使用箭頭函式，不過其它地方一樣不行
  state: () => {
    return {
      // productDetail: [],
      cart: [],
      totalProduct: 0,
      cartList:[],
    };
  },
  actions: {
    addToCart(productId, howMany, total) {
      // 取得已經有加入購物車的項目
      // 進行判斷，如果購物車有該項目則 +1，如果沒有則是新增一個購物車項目
          console.log('addToCart',productId,howMany, total)
      
          const currentCart = this.cart.find((item) => item.productId === productId)
      
          if (currentCart) {
            currentCart.howMany += howMany
            currentCart.total += total

            this.addToCartAPI(productId, currentCart.howMany)

          } else {
            this.cart.push({
              id: new Date().getTime(),
              productId,
              howMany,
              total,
            }) 

            this.addToCartAPI(productId, howMany )
          }
          
 


    },
    addToCartAPI(productId, howMany) {

      const tokenNow = localStorage.getItem("shopCartToken");
      
          fetch("https://tom-store-api.onrender.com/tom-store-api/shoppingCart", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'authorization': "Bearer" + " " + tokenNow 
            },
            body: JSON.stringify({
              "selectProductAmount": howMany,
              "productId":productId,
            }),
            })
            .then(response => response.json())
            .then(data => {
              console.log(data, 'data')
              // location.reload()
            })
    },
    removeCartItem(id, selectProductAmount) {
      console.log(id, selectProductAmount)

      const tokenNow = localStorage.getItem("shopCartToken");

      // const index = this.cart.findIndex((item) => { item.id === id })
      // console.log(this.cart)
      // this.cart.splice(index, 1)

      // 確認是否刪除商品
         let deleteCheck 
         if (confirm("確定要刪除嗎") == true) {
                // text = "You pressed OK!";
           deleteCheck = 0
            location.reload()
          } else {
            // text = "You canceled!";
           deleteCheck = selectProductAmount
          }

      // 確認刪除則，如果產品數量設成0，則將該產品會從該會員購物車移除  
          fetch("https://tom-store-api.onrender.com/tom-store-api/shoppingCart", {
            method: "PATCH",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'authorization': "Bearer" + " " + tokenNow 
            },
            body: JSON.stringify({
              updateShoppingCartDtoList: [
                {
                  "productId": id,
                  "selectProductAmount": deleteCheck,
                }
              ]
            }),
            })
            .then(response => response.json())
            .then(data => {
              // console.log(data, 'data')

           
            })

    },
    getCartItem() {

      const tokenNow = localStorage.getItem("shopCartToken");

        fetch("https://tom-store-api.onrender.com/tom-store-api/shoppingCart", {
            method: "GET",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'authorization': "Bearer" + " " + tokenNow 
            },
            // body: JSON.stringify({
            //   "productAmount": howMany,
            //   "productId":productId,
            // }),
            })
            .then(response => response.json())
            .then(data => {
              
              this.cartList = data.data.shoppingCartDtoList
              // console.log(this.cartList, 'dataCartList')
              // location.reload()
            })
    }
  },
  getters: {
    // cartList: ({ cart }) => {
    //   const { posts } = productStore()

    //   const carts = cart.map((item) => {

    //     const product = posts.find((product) => product.id === item.productId)

    //     return {
    //         ...item,
    //       product,
    //     }
    //   })

    //   // console.log(carts, 'carts')

    //   const initialValue = 0;
    //   const sum = carts.reduce(
    //     (accumulator, currentValue) => accumulator + currentValue.total,
    //     initialValue
    //     );
    //     console.log(sum, 'sum')


    //   return {
    //     carts,
    //     sum,
    //   }
    // }
  },
});