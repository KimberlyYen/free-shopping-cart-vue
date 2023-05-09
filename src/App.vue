<script setup>
import { provide, ref } from "vue";
import Nav from './views/Nav.vue'

// const location = ref('North')

// function updateLocation() { 
//     updateLocation.value = 'south pole'
// }

// provide('location', {
//     location,
//     updateLocation
// })
// const data = { id: 123 }
// provide('data', data)

// console.log(data)



// function updateParams(msg) {
//     this.selectArr.push(msg)
//     console.log(msg)
// }
        




</script>

<template>
    <Nav />
    <router-view></router-view>
    
</template>




<style scoped>


</style>
