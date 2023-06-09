import { defineStore } from 'pinia'

export default defineStore('cart', {
  // 在此可以使用箭頭函式，不過其它地方一樣不行
  state: () => {
    return {
      // productDetail: [],
      cart: [],
      totalProduct: 0,
      cartList: [],
      count: 100,
      isLoading: false,
    };
  },
  actions: {
    addToCart(productId, howMany) {
      // 取得已經有加入購物車的項目
      // 進行判斷，如果購物車有該項目則 +1，如果沒有則是新增一個購物車項目
      
       const currentCart = this.cartList.find((item) => item.productDto.id === productId)

      if (currentCart) {
        currentCart.selectProductAmount += howMany
        // currentCart.total += total

        this.addToCartAPI(productId, currentCart.selectProductAmount)
            
      } else {
        this.cart.push({
          id: new Date().getTime(),
          productId,
          howMany,
          // total,
        }) 

        this.addToCartAPI(productId, howMany)
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
              "productId": productId,
              
            }),
            })
            .then(response => response.json())
            .then(data => {
              console.log(data, 'data')
              // location.reload()
              this.getCartItem()
             
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
          deleteCheck = 0
          } else {
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
              // this.isLoading = true;
            }).finally(() => {
              // this.isLoading = false; // 请求完成后，将isLoading设置为false，隐藏加载动画
               location.reload()
            });

    },
    getCartItem() {

      const tokenNow = localStorage.getItem("shopCartToken");

        this.isLoading = true;

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
            }).finally(() => {
              this.isLoading = false; // 请求完成后，将isLoading设置为false，隐藏加载动画
            });
    }
  },
  getters: {
    sumCount(state) {
      
      
      const initialValue = 0;
      const sum = state.cartList.reduce(
        (accumulator, currentValue) =>
          // console.log(accumulator.selectProductAmount * accumulator.productDto.price)
          accumulator + (currentValue.selectProductAmount * currentValue.productDto.price)
          ,
          initialValue
        );
      
      
      
      return sum
    },
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