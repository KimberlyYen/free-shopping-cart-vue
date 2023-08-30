<template>


<div class="container">
    <div class="content">
        <h2>通知</h2>
        <p>恭喜您購買成功，具體明細已寄送至信箱，請前往查看，祝您發大財</p>
        <h3>SUCCESS</h3>
        {{ name }}
    </div>
</div>



</template>

<script>


export default {

    data() { 
        return {
   
    
        }
    },
    methods: {

    },
    created() {
  }
}
</script>

<style scoped>
.container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40vh; /* 设置容器的高度，例如100vh表示占满整个视口高度 */
        background-color: antiquewhite;
        margin-top: 20px;
    }

    .content {
        text-align: center;
    }
</style>
