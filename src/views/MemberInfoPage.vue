<template>
    <div class="container ShoppingCart">
        <h2 class="text-primary">會員資料管理</h2>
        

    <form class="container row g-3">
        <div class="col-md-6">
            <label for="inputEmail4" class="form-label">收件人</label>
            <input type="email" class="form-control" id="inputEmail4">
        </div>
        <div class="col-md-6">
            <label for="inputPassword4" class="form-label">連絡電話</label>
            <input type="password" class="form-control" id="inputPassword4">
        </div>
        <div class="col-12">
            <label for="inputAddress" class="form-label">收件地址</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
        </div>
        <div class="col-md-6">
            <label for="inputState" class="form-label">信用/金融卡</label>
            <select id="inputState" class="form-select">
            <option selected>Choose...</option>
            <option>信用卡</option>
            <option>金融卡</option>
            </select>
        </div>
        <div class="col-md-6">
            <label for="inputCity" class="form-label">付款方式</label>
            <input type="text" class="form-control" id="inputCity">
        </div>
        <div class="col-12">
            <label for="inputAddress2" class="form-label">郵件信箱</label>
            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
        </div>
    </form>

                



    </div>

</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../stores/cartStore.js'


export default {
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
        // 1. Store
        // 2. 要帶入的 state, Getter
        ...mapState(cartStore, ['checkoutList', 'count','sumCountCheckout','isLoading']),
    },
    methods: {
        ...mapActions(cartStore, ['removeCartItem', 'addToCartAPI', 'getCartItem']),
    }
};

</script>

<style scoped>
img{
    width: 100px;
    height: 100px;
}
.delete, .number-button{
    cursor: pointer;
}
.howManyProductStyle{
    width: 3vw;
}
.productId-size{
    font-size: 5px;
}
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 2em;
  width: 100%;
  background-color: rgb(223, 223, 223);
  margin-left: auto;
  display: flex;
}
</style>