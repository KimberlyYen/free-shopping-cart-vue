<template>

    <div class="container ShoppingCart">
        <h2>ShoppingCart</h2>

        <!-- Loading -->
        <div  v-if="isLoading" class="d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="p-2">
                加載中...
            </div>
        </div>
        
        <div v-if="!cartList.length"> 購物車沒有任何品項 </div>
        <table v-else class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th></th>
                        <th scope="col">產品照片</th>
                        <th scope="col">產品名稱</th>
                        <th scope="col">數量</th>
                        <th scope="col">價格</th>
                        <th scope="col">小計</th>
                        <th scope="col">刪除</th>
                    </tr>
                </thead>
                
                <tbody v-for="(item, i) in cartList" :key="item.id">

                    <tr >
                        <th scope="row" > {{ i + 1 }}</th>
                        <td width="10%"> <input type="checkbox"></td>
                        <td>
                            <img 

                            :src="item.productDto.mainProductImgDisplayUrl" alt="productIMG">
                        </td>
                        <td  class="col-3"> {{ item.productDto.productName }} <br/> <span class="productId-size">{{  item.productDto.id }}</span></td>
                       
                        <td >
                            <div class="d-flex flex-row gap-2">
                                <div class="number-button bg-danger text-white col-2 text-center rounded"  @click="removeHowMany(item)">-</div>

                                <label for="howManyProduct">
                                    <input class="howManyProductStyle text-center" id="howManyProduct" :value="item.selectProductAmount" type="text" min="0" />
                                </label>

                                <div  class="number-button bg-success text-white col-2 text-center rounded" @click="addHowMany(item)">+</div>

                            </div>
                        </td>
                        <td> NT.{{ item.productDto.price }}</td>
                        <td> NT.{{ item.productDto.price *  item.selectProductAmount }}</td>
                        <td 
                        class="delete text-danger"
                        @click="removeCartItem(item.productDto.id, item.selectProductAmount)"> X </td>
                    </tr>

                </tbody>
                <tfoot>
                    <div class="mt-3">
                        總金額 $ {{ sumCount }}
                    </div>
                    <div class="btn btn-success rounded-5 col-6 mt-3">
                        結帳
                    </div>
                </tfoot>
        </table>

    </div>

</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../stores/cartStore.js'



export default {
    created() {
        this.getCartItem()
    },
    computed: {
        // 1. Store
        // 2. 要帶入的 state, Getter
        ...mapState(cartStore, ['cartList', 'count','sumCount','isLoading']),
    },
    methods: {
        ...mapActions(cartStore, ['removeCartItem', 'addToCartAPI', 'getCartItem']),
        addHowMany(item) {
            item.selectProductAmount += 1;
            this.addToCartAPI(item.productDto.id, item.selectProductAmount)
        },
        removeHowMany(item) {
            if (item.selectProductAmount <= 0) {
                item.selectProductAmount = 0
            } else {
                item.selectProductAmount -= 1;
                this.addToCartAPI(item.productDto.id, item.selectProductAmount)
            }
        }
    }
};

</script>

<style scoped>
/* table{
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
} */
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
</style>
