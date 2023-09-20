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
    addToCart(tokenToComponent, productId, howMany) {
      // 取得已經有加入購物車的項目
      // 進行判斷，如果購物車有該項目則 +1，如果沒有則是新增一個購物車項目
      const currentCart = this.cartList.find((item) => item.productDto.id === productId)

      if (currentCart) {
        currentCart.selectProductAmount += howMany
        // currentCart.total += total

        this.addToCartAPI(tokenToComponent, productId, currentCart.selectProductAmount)

      } else {
        this.cart.push({
          id: new Date().getTime(),
          productId,
          howMany,
        })

        this.addToCartAPI(tokenToComponent, productId, howMany)
      }


    },
    addToCartAPI(tokenToComponent, productId, howMany) {

      // 在这里可以进行进一步的处理，例如创建账号
      const addToCartAPIData = {
        "selectProductAmount": howMany,
        "productId": productId,
      };


      axios.post("https://tom-store-api.onrender.com/tom-store-api/shoppingCart", addToCartAPIData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'authorization': "Bearer" + " " + tokenToComponent
        }
      })
        .then(response => response.json())
        .then(this.getCartItem(tokenToComponent));

    },
    removeCartItem(id, tokenToComponent) {
      // console.log(tokenToComponent)

      // const tokenNow = localStorage.getItem("shopCartToken");

      // 確認是否刪除商品
      let deleteCheck
      if (window.confirm("確定要刪除嗎?")) {
        deleteCheck = 0
      }

      let removeData = {
        updateShoppingCartDtoList: [
          {
            "productId": id,
            "selectProductAmount": deleteCheck,
          }
        ]
      }

      axios.patch("https://tom-store-api.onrender.com/tom-store-api/shoppingCart", removeData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'authorization': "Bearer" + " " + tokenToComponent
        },
      })
        .then(response => response.json())
        .then(response => {
          const data = response.data;
          console.log(data);

        })
        .catch(error => {
          console.error("请求出错：", error);
          alert(error.response.data.rm)
        })
        .finally(() => {
          location.reload()
        });

    },
    getCartItem(tokenToComponent) {

      // const tokenNow = localStorage.getItem("shopCartToken");

      this.isLoading = true;

      axios.get("https://tom-store-api.onrender.com/tom-store-api/shoppingCart", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'authorization': "Bearer" + " " + tokenToComponent
        }
      })
        .then(response => {
          const data = response.data;
          // console.log(data);

          this.cartList = data.data.shoppingCartDtoList

          // 購物車ID列表
          data.data.shoppingCartDtoList.map((item) => {
            this.shoppingCartIdList.push(item.id)
          })

        })
        .catch(error => {
          console.error("请求出错：", error);
          // alert(error.response.data.rm)
        })
        .finally(() => {
          this.isLoading = false; // 请求完成后，将isLoading设置为false，隐藏加载动画
        });

    },
    getProductToCheckout(item, ids) {
      this.checkoutList = item
      this.shoppingCartIdList = ids
    },
    goToCheckOutResult(addressee, phone, address, howToPay, useCard, mail, _this, tokenToComponent) {
      // console.log('tokenToComponent')
      // console.log(addressee, phone, address, howToPay, useCard, mail)

      // 加載中顯示Loading動畫
      this.isLoading = true;

      // 收件人資訊
      let result = {
        checkOutPersonInfoDto: {
          payType: howToPay,
          receivedAddress: address,
          receivedEmail: mail,
          receivedPersonName: addressee,
          receivedPhone: phone,
          creditCardNumber: useCard,
        },
        //商品組合id
        shoppingCartIdList: this.shoppingCartIdList
      }
      console.log(result, 'result')

      // const tokenNow = localStorage.getItem("shopCartToken");

      axios.post("https://tom-store-api.onrender.com/tom-store-api/orderSettlement", result, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer " + tokenToComponent
        }
      })
        .then(response => {
          // 成功 call API 之後
          alert('確認結帳')
          // 跳頁至成功頁面
          _this.$router.push('./success')

        })
        .catch(error => {
          console.error("请求出错：", error);
          alert(error.response.data.rm)

          if (error.response.data.rm === "Token is Expired") {
            _this.$router.push('./')
          }

        })
        .finally(() => {
          this.isLoading = false; // 请求完成后，将isLoading设置为false，隐藏加载动画
        })


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