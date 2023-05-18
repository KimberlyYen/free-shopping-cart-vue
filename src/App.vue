<template>
    <Nav @value-update="getValFromChild" />
    <router-view :inputName="inputContent"></router-view>
    
</template>

<script>
import Nav from '../src/views/Nav.vue'

export default {
    components: {
        Nav,
    },
    data() { 
        return {
            inputContent: [],
        }
    },
    methods: {
        getValFromChild(val) {
            // this.inputContent = val
            this.inputContent = val;
            // val = this.inputContent
            console.log(val, 'APP')

            
        },
    },
    
}
</script>






<style scoped>
</style>
