import { defineStore } from 'pinia'
import axios from 'axios';

export default defineStore('cart', {
  // 在此可以使用箭頭函式，不過其它地方一樣不行
  state: () => {
    return {
      cart: [],
      totalProduct: 0,
      cartList: [],
      count: 100,
      isLoading: false,
      checkoutList: [],
      shoppingCartIdList: [],
      lastSelectedItem: {},
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
          // console.log(data, 'data')
          // location.reload()
          this.getCartItem()

        })
    },
    removeCartItem(id) {
      const tokenNow = localStorage.getItem("shopCartToken");

      // 確認是否刪除商品
      let deleteCheck
      if (window.confirm("確定要刪除嗎?")) {
        deleteCheck = 0
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
        }).finally(() => {
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
      })
        .then(response => response.json())
        .then(data => {
          this.cartList = data.data.shoppingCartDtoList

          // 購物車ID列表
          data.data.shoppingCartDtoList.map((item) => {
            this.shoppingCartIdList.push(item.id)
          })

        }).finally(() => {
          this.isLoading = false; // 请求完成后，将isLoading设置为false，隐藏加载动画
        });
    },
    getProductToCheckout(item, ids) {
      this.checkoutList = item
      this.shoppingCartIdList = ids
    },
    goToCheckOutResult(addressee, phone, address, howToPay, useCard, mail, _this) {
      console.log(useCard)
      // console.log(addressee, phone, address, howToPay, useCard, mail)

      // 收件人資訊
      let result = {
        checkOutPersonInfoDto: {
          payType: '2',
          receivedAddress: address,
          receivedEmail: mail,
          receivedPersonName: addressee,
          receivedPhone: phone,
          creditCardNumber: '2',
        },
        //商品組合id
        shoppingCartIdList: this.shoppingCartIdList
      }
      console.log(result, 'result')

      const tokenNow = localStorage.getItem("shopCartToken");

      axios.post("https://tom-store-api.onrender.com/tom-store-api/orderSettlement", result, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer " + tokenNow
        }
      })
        .then(response => {
          // console.log(response);

          // 成功 call API 之後
          alert('確認結帳')
          // 跳頁至成功頁面
          _this.$router.push('./success')

        })
        .catch(error => {
          console.error("请求出错：", error);
          alert(error.response.data.rm)
        });


    },
    checkToken() {
      // 在这里进行检查Token的逻辑
      const token = localStorage.getItem('shopCartToken');
      if (token) {
        // alert('已加入購物車')
        this.hasToken = true;
        // console.log('YES')
      } else {
        alert('請先登入會員')
        this.hasToken = false;
        // console.log('NO')
        window.location.href = '/free-shopping-cart/login';
      }
    },
  },
  getters: {
    sumCount(state) {

      const initialValue = 0;
      const sum = state.cartList.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue.selectProductAmount * currentValue.productDto.price)
        ,
        initialValue
      );

      return sum
    },
  },
});