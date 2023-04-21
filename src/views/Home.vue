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

    <div class="cards d-flex flex-column py-5">
        <div class="cardsInner">

            <div class="cardsTop container row">
                <div class="card col" style="width: 18rem;">
                    <img src="https://picsum.photos/400/300" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
        
                <div class="card col" style="width: 18rem;">
                    <img src="https://picsum.photos/400/300" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
        
                <div class="card col" style="width: 18rem;">
                    <img src="https://picsum.photos/400/300" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
    
            <div class="cardsBottom container row">
                <div class="card col" style="width: 18rem;">
                    <img src="https://picsum.photos/400/300" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
        
                <div class="card col" style="width: 18rem;">
                    <img src="https://picsum.photos/400/300" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
        
                <div class="card col" style="width: 18rem;">
                    <img src="https://picsum.photos/400/300" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

        </div>

        <el-pagination class="justify-content-center py-5" background layout="prev, pager, next" :total="1000" />
    </div>





</template>

<script>
  import { ElButton } from 'element-plus'
  export default {
    components: { ElButton },
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
</style>
