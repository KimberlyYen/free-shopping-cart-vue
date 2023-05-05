<script setup>
import Nav from './views/Nav.vue'

function updateParams(msg) {
    this.selectArr.push(msg)
    console.log(msg)
}
        
// export default {
//     data() {
//         return {

//         }
//     },
//     methods: {
//         updateParams(msg) {
//             this.selectArr.push(msg)
//             console.log(msg)
//         }
//     }
// }

</script>

<template>
    <Nav />
    <router-view></router-view>
    
</template>




<style scoped>


</style>
