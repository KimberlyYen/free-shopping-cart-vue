<template>

    <div class="carousel d-flex justify-content-center bg-black">
        <div id="carouselExampleIndicators" class="carousel slide " data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="https://picsum.photos/1200/300/?random=1" class="" alt="...">
                </div>
                <div class="carousel-item">
                <img src="https://picsum.photos/1200/300/?random=2" class="" alt="...">
                </div>
                <div class="carousel-item">
                <img src="https://picsum.photos/1200/300/?random=3" class="" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <div class="container cards grid py-5">
        <div class="w-full">

            <div>
                搜尋內容：
                <span v-for=" item in inputName"> {{item.search}} </span>
            </div>
            <div class="row justify-content-center">
                <div class="card col-12 col-md-3 col-lg-2 m-1" v-for="(p, key) in posts" :key="p.id" style="width: 18rem;"
                @click="selectedProduct(p)">
                    <div class="w-full">
                        <router-link :to="{path: '/product', query: {id:`${p.id}` }}">
                            <img  :src="p.mainProductImgDisplayUrl" class="card-img-top" alt="...">
                        </router-link>
                    </div>
        
                    <div class="card-body " >
                        <h5 class="card-title"> {{ key + 1 }} - {{p.productName}}</h5>
                        <p class="text-primary text-opacity-25 fs-6">id:{{ p.id }}</p>
                        <p class="card-text">NT. {{ p.price }}</p>
                        <p class="card-note">{{ p.note }}</p>
                        <router-link :to="{path: '/product', query: {id:`${p.id}` }}">
                            <a href="#" class="btn btn-primary">前往產品詳細</a>
                        </router-link>
                    </div>
        
                </div>  
            </div>

        </div>

        
            
    </div>

    <el-pagination class="justify-content-center py-5" background layout="prev, pager, next" :total="1000" />


</template>

<script>
import { ElButton } from 'element-plus'

export default {
props: {
    inputName: Array,
},    
components: {
    ElButton,
},
data(){
        return {
        posts: [],
    }
    },
    mounted() {
      this.getPosts()
    },
    watch: {
    // whenever question changes, this function will run
    inputName(newQuestion, oldQuestion) {
      if (newQuestion !== '') {
          this.getPosts()
      }
    }
   },
    methods: {
        getPosts() {    

            
            let array = this.inputName

                let fuzzy = array[0].searchKey
                let category = array[1].elSelected


            fetch("https://tom-store-api.onrender.com/tom-store-api/product/pagination", {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "pageNum": 1,
                    "pageSize": 10,
                    "fuzzyProductName": fuzzy,
                    "productCategoryId":category,
                }),
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.posts = data.data.productPageInfo.list
            })
        },
    },
}

  
</script>

<style scoped>
</style>
