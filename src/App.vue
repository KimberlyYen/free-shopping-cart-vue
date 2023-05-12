<template>
    <Nav @value-update="getValFromChild"/>
    <router-view :searchVal="searchVal"></router-view>
    
</template>

<script>
import Nav from '../src/views/Nav.vue'

export default {
    components: {
        Nav,
    },
    data() { 
        return {
            inputValFromChild: '',
            searchVal:'',
        }
    },
    methods: {
        getValFromChild(val) {
            this.inputValFromChild = val;
            console.log(this.inputValFromChild, 'APP')
            this.searchVal = val
        },

    },
    
}



</script>






<style scoped>


</style>
