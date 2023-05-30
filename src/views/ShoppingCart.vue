<template>

    <div class="container ShoppingCart">
        <h2>ShoppingCart</h2>

        
        <table class="table">
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
            <div v-if="!cartList.carts.length"> 購物車沒有任何品項 </div>
            <tbody v-else  v-for="(item, i) in cartList.carts" :key="item.id">
                <tr >
                    <th scope="row" > {{ i + 1 }}</th>
                    <td> <input type="checkbox"></td>
                    <td>
                        <img 

                        :src="item.product.mainProductImgDisplayUrl" alt="productIMG">
                    </td>
                    <td > {{ item.product.productName }}</td>
                    <td >
                        <select name="" id="" class="col-8">
                            <option value="">{{ item.howMany }}</option>
                        </select>
                    </td>
                    <td> NT.{{ item.product.price }}</td>
                    <td> NT.{{ item.total }}</td>
                    <td 
                    class="delete"
                    @click="removeCartItem(item.id)"> X </td>
                </tr>
            </tbody>
            <tfoot>
                總金額 $ {{ cartList.sum  }}
            </tfoot>
        </table>
       
       

    </div>





</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../stores/cartStore.js'


export default {
    computed: {
        // 1. Store
        // 2. 要帶入的 state, Getter
        ...mapState(cartStore, ['cartList']),
    },
    methods: {
        ...mapActions(cartStore,['removeCartItem'])
    }
};

</script>

<style scoped>
table{
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
img{
    width: 100px;
    height: 100px;
}
.delete{
    cursor: pointer;
}
</style>
