<template>


    <div class="container card mt-5">
        <div class="row p-5" v-for="p in productDetail">
            
            <div class="col ">
                <div >
                    <img :src="p.mainProductImgDisplayUrl" alt="productIMG" class="picture">
                </div>
            </div>

            <div class="col">
                <div class="card-body">
                    <p class="text-primary text-opacity-25 fs-6">id: {{ p.id }}</p>
                    <h5 class="card-title"> Title {{ p.productName }}</h5>
                    <p class="card-text"> {{ p.note }}</p>
                    <p>
                        NT. {{ p.price }}
                    </p>
                    <div>加總 {{ total }} </div>
                </div>
                <div>
                    <input type="number" min="0" class="m-2" @keyup.enter="sum" @click="sum($event)" v-model.number="howMany"> {{ p.remainingAmountUnit }}
                    <br>

                        <router-link to="/shoppingCart">
                            <a href="#" class="btn btn-primary" @click="addToCart(p.id, this.howMany, this.total)">加入購物車</a>
                        </router-link>

                </div>
            </div>

        </div>
    </div>


</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '../stores/cartStore'



export default {
    data() { 
        id: ""
        return {
            productDetail: [],
            hasToken: false,
            howMany:0,
            total: 0,
        }
    },
    created() {
        this.getUrlId()
    },
    mounted() {
        this.checkToken()
    },
    computed: {
        // 1. Store
        // 2. 要帶入的 state, Getter
        ...mapState(cartStore, ['cart', 'totalProduct']),
    },
    methods: {
        ...mapActions(cartStore,['addToCart']),  
        getUrlId() {
            let productId = this.$route.query.id

            // console.log(productId)
            fetch(`https://tom-store-api.onrender.com/tom-store-api/product/${productId}`)
            .then(response => response.json())
            .then(data => { 
                // console.log(data)
                this.productDetail = data.data.productDtoList
                }
            )
        },
        sum(event) {
            this.total = event.currentTarget.value * this.productDetail[0].price
        },
        checkToken() {
            // 在这里进行检查Token的逻辑
            const token = localStorage.getItem('token');
            if (token) {
                this.hasToken = true;
                console.log('YES')
            } else {
                this.hasToken = false;
                console.log('NO')
                this.$router.push('/login');
            }
        },
    },

}
</script>

<style scoped>
/* .cards {
    display: flex;
    flex-wrap: wrap;
} */
/* .cardsInner {
    margin-left: auto; 
    margin-right: auto; 
} */
.picture {
    max-width: 50%;
    /* height: 50%; */
    /* object-fit: cover; */
    /* display: block;
    max-width: 100%; */
    /* width: 100%; */
}
</style>
