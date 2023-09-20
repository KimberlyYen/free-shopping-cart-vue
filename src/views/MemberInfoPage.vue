<template>
    <div class="container ShoppingCart">
        <h2 class="text-primary">會員資料管理</h2>


    <form class="container row g-3" >
        <div class="col-12" >
            <label for="birthday" class="form-label">會員生日</label>
            <input type="text" class="form-control" id="birthday" v-model="newBirthday" >
        </div>
        <div class="col-12" >
            <label for="country" class="form-label">會員國籍</label>
            <input type="text" class="form-control" id="country" v-model="newCountry" >
        </div>
        <div class="col-12">
            <label for="displayName" class="form-label">會員姓名</label>
            <input type="text" class="form-control" id="displayName"  v-model="newDisplayName">
        </div>
        <div class="col-12">
            <label for="gender" class="form-label">會員性別(MALE=男 FEMALE=女 OTHER=其他)</label>
            <input type="text" class="form-control" id="gender"  v-model="newGender">
        </div>
        <div class="col-12">
            <label for="memberTypes" class="form-label">會員類型(多重身份使用逗號隔開, "ADMIN= 管理者 SELLER=賣家 CUSTOMER=買家")</label>
            <input type="text" class="form-control" id="memberTypes"  v-model="newMemberTypes">
        </div>
        <div class="col-12">
            <label for="note" class="form-label">備註</label>
            <input type="text" class="form-control" id="note"  v-model="newNote">
        </div>
    </form>
    <br>
    <button @click="updateMember(newBirthday,newCountry,newDisplayName,newGender,newMemberTypes,newNote,newPassword)"> 更新 </button>


    </div>

</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '../stores/memberStore'

export default {
    data() {
        return {
            newBirthday: '',
            newCountry:'',
            newDisplayName:'',
            newGender: '',
            newMemberTypes: '',
            newNote:'',
        }
    },
    mounted() {
    },
    created() {
    },
    computed: {
        ...mapState(memberStore, ['birthday','country', 'displayName', 'gender', 'memberTypes','note', 'memberData']),
    },
    methods: {
        ...mapActions(memberStore, ['getMember', 'updateMember']),   
    },
    watch: {
        birthday: {
            handler(newValue) {
                this.newBirthday = newValue;
                console.log(newValue)
            },
            immediate: true
        },
        country: {
            handler(newValue) {
                this.newCountry = newValue;
                console.log(newValue)
            },
            immediate: true
        },
        displayName: {
            handler(newValue) {
                this.newDisplayName = newValue;
                console.log(newValue)
            },
            immediate: true
        },
        gender: {
            handler(newValue) {
                this.newGender = newValue;
                console.log(newValue)
            },
            immediate: true
        },
        memberTypes: {
            handler(newValue) {
                this.newMemberTypes = newValue;
                console.log(newValue)
            },
            immediate: true
        },
        note: {
            handler(newValue) {
                this.newNote = newValue;
                console.log(newValue)
            },
            immediate: true
        },
    },
};

</script>

<style scoped>

</style>