<template>


    <div class="cards d-flex flex-column py-5">

        <div class="cardsInner w-50">


            <div class="card" v-for="p in productDetail">
                <div class="product-img">
                    <img :src="p.mainProductImgDisplayUrl" class="card-img-top w-full w-50" alt="...">
                </div>
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
                    <input type="number" class="m-2" @keyup.enter="sum" @click="sum($event)"> {{ p.remainingAmountUnit }}
                    <a href="#" class="btn btn-primary" @click="addProduct(p)">加入購物車</a>
                </div>
            </div>
    

        </div>

    </div>



</template>

<script>
export default {
    data() { 
        id: ""
        return {
            total:0,
            productDetail: [],
            hasToken: false,
            orderProduct:[],
        }
    },
    created() {
        this.getUrlId()
    },
    mounted() {
        this.checkToken()
    },
    methods: {
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
            // console.log(event.currentTarget.value , 'value')
            // console.log(this.productDetail[0].price, 'price')
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
        addProduct(product) {
            // console.log(product)
            this.orderProduct.push({ productName: product }, { totalPrice: this.total })
            // this.orderProduct.push(this.total)
            console.log(this.orderProduct)

            // 导航到下一页并传递数据
            this.$router.push({ name: 'ShoppingCart', params: { data: this.orderProduct } });
            // this.$router.push('/shoppingCart');
            // this.$emit('order-product', this.orderProduct)
        }
    },

}
</script>

<style scoped>
.cards {
    display: flex;
    flex-wrap: wrap;
}
.cardsInner {
    margin-left: auto; 
    margin-right: auto; 
}
.product-img {
    display: block; /* ★★★★★ */
    max-width: 100%;
}
</style>
