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
                <img src="https://picsum.photos/1920/400/?random=1" class="" alt="...">
                </div>
                <div class="carousel-item">
                <img src="https://picsum.photos/1920/400/?random=2" class="" alt="...">
                </div>
                <div class="carousel-item">
                <img src="https://picsum.photos/1920/400/?random=3" class="" alt="...">
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


            <div class="mb-4">
                搜尋內容：

                <span> {{this.fuzzy}} </span>
            </div>
            <div class="row justify-content-center">
                <div class="card col-12 col-md-3 col-lg-2 m-1 p-2" v-for=" (p, key) in sortProduct" :key="key" style="width: 18rem;"
                >
                    <div class="w-full">
                        <router-link :to="{path: '/product', query: {id:`${p.id}` }}">
                            <img  :src="p.mainProductImgDisplayUrl" class="card-img-top" alt="...">
                        </router-link>
                    </div>
        
                    <div class="card-body d-flex flex-column" >
                        <h5 class="card-title"> {{ key + 1 }} - {{p.productName}}</h5>
                        <p class="text-primary text-opacity-25 fs-6">id:
                            <br>
                            <span>
                                {{ p.id }}
                            </span>
                        </p>
                        <p class="text-primary text-opacity-25 fs-6">productCategoryId:
                            <br>
                            <span>
                                {{ p.productCategoryId }}
                            </span>
                        </p>
                        <p class="card-text">NT. {{ p.price }}</p>
                        <p class="card-note">{{ p.note }}</p>
                        <router-link class="mt-auto" :to="{path: '/product', query: {id:`${p.id}` }}">
                            <a href="#" class="btn btn-outline-primary w-100 ">前往產品詳細</a>
                        </router-link>
                    </div>
        
                </div>  
            </div>

        </div>

        
            
    </div>
    <el-pagination class="justify-content-center py-5" background layout="prev, pager, next" :total="this.totalPage" 
      v-model:current-page="this.currentPage"
      @current-change="handleCurrentPage"
    />


</template>

<script>
import { ElButton } from 'element-plus'
import { mapState, mapActions } from 'pinia'
import productStore from '../stores/productStore'



export default {
props: {
    inputName: Array,
},    
components: {
    ElButton,
},
data(){
    return {
    }
    },
    created() {
    } ,
    mounted() {
        this.getProducts()
    },
    watch: {
    // whenever question changes, this function will run
    inputName(newQuestion, oldQuestion) {
      if (newQuestion !== '') {
          this.getSearchVal()
          this.getProducts()
      }
    }
    },
    computed: {
        // 1. Store
        // 2. 要帶入的 state, Getter
        ...mapState(productStore, ['sortProduct', 'fuzzy', 'category','currentPage', 'totalPage']),
    },
    methods: {
        ...mapActions(productStore, ['getProducts', 'getSearchVal', 'handleCurrentPage']),      
        getSearchVal() {   
            let array = this.inputName
            console.log(array, 'HOME')
            
            this.fuzzy = array[0].searchKey
            this.category = array[1].elSelected
        },
    },
}

  
</script>

<style scoped>
/* .carousel {
   width:100vw;
 } */
.carousel img {
    width: 100vw;
    height: 400px;
 }

.happy{
    font-size: 10px;
    text-align: center;
    color: white;
    background: blue;
    padding: 8px 16px;
    width: 30%;
    border-radius: 16px;

}

.green{
    background: green;
}

.black{
    background-color: #000000;
}

</style>
