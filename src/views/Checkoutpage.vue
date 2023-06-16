<template>

    <div class="container ShoppingCart">
        <h2 class="text-primary">明細確認</h2>

        <!-- Loading -->
        <div  v-if="isLoading" class="d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="p-2">
                加載中...
            </div>
        </div>
        
        <div v-if="!checkoutList.length"> 購物車沒有任何品項 </div>
        <table v-else class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <!-- <th></th> -->
                        <th scope="col">產品照片</th>
                        <th scope="col">產品名稱</th>
                        <th scope="col">數量</th>
                        <th scope="col">價格</th>
                        <th scope="col">小計</th>
                        <th scope="col">刪除</th>
                    </tr>
                </thead>
                
                <tbody v-for="(item, i) in checkoutList" :key="item.id">

                    <tr >
                        <th scope="row" > {{ i + 1 }}</th>
                        <!-- <td width="10%"> <input type="checkbox" disabled></td> -->
                        <td>
                            <img 

                            :src="item.productDto.mainProductImgDisplayUrl" alt="productIMG">
                        </td>
                        <td  class="col-3"> {{ item.productDto.productName }} <br/> <span class="productId-size">{{  item.productDto.id }}</span></td>
                       
                        <td >
                            <div class="d-flex flex-row gap-2">
                                <label for="howManyProduct">
                                    <input disabled class="howManyProductStyle text-center" id="howManyProduct" :value="item.selectProductAmount" type="text" min="0" />
                                </label>
                            </div>
                        </td>
                        <td> NT.{{ item.productDto.price }}</td>
                        <td> NT.{{ item.productDto.price *  item.selectProductAmount }}</td>
                        <!-- <td 
                        class="delete text-danger"
                        @click="removeCartItem(item.productDto.id, item.selectProductAmount)"> X </td> -->
                    </tr>

                </tbody>
                
                <div class="footer justify-content-center gap-4">
                    <div class="mt-3 col-2">
                        總金額 $ {{ sumCountCheckout }}
                    </div>
                    <router-link to="/shoppingCart" class="btn btn-danger rounded-5 col-2 mt-3">
                        <div type="button" class="p-0">上一頁</div>
                    </router-link>
                    <div class="btn btn-success rounded-5 col-2 mt-3" >
                        確認結帳
                    </div>
                </div>
        </table>

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