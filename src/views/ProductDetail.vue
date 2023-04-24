<template>


    <div class="cards d-flex flex-column py-5">
        <div class="cardsInner">


            <div class="card col" >
                <div class="product-img">
                    <img src="https://picsum.photos/800/600" class="card-img-top w-full" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            <div>
                <input type="number" class="m-2">
                <a href="#" class="btn btn-primary">加入購物車</a>
            </div>
    

        </div>

    </div>



</template>

<script>

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
