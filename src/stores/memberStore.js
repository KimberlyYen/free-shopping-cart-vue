import { defineStore } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

export default defineStore('memberStore', {
    state: () => (    
        {
            tokenToComponent:'',
        }
    ),
    actions: {
        // this
    login(email, password) {
      // 获取用户名和密码        
        // console.log(email)
        // console.log(password)

      
      // 在这里可以进行进一步的处理，例如登录验证
        fetch("https://tom-store-api.onrender.com/tom-store-api/member/login", {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "email": email,
              "password": password,
          }),
        })
        .then(response => response.json())
        .then(data => {
        let token = data.data.access_token
        localStorage.setItem('shopCartToken', token);
        alert('Success!')
        history.go(-1)
        
        }).catch((error) => { 
          console.log(error)
          alert("Error:", error.rm)
        }).finally(() => {

        // const tokenNow = localStorage.getItem("shopCartToken");
        });
      
      // 清空表单
      this.username = '';
      this.password = '';
    },
    createAccount(name,password,email,birthday,gender,country) {
      // 获取用户名、密码和邮箱
      
      // 在这里可以进行进一步的处理，例如创建账号
      fetch("https://tom-store-api.onrender.com/tom-store-api/member/signUp", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
                "displayName":name,
                "password": password,
                "email": email,
                "birthday": birthday,
                "gender": gender,
                "country": country,
            }),
        })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          alert('Success!')
            // this.$router.push('/');
           history.go(-1)
          
        })
      
        // 清空表单
        this.name = '';
        this.password = '';
        this.email = '';

        },

        
        
    }
})